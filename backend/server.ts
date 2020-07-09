//
// Web Server
//

////////// SETUP \\\\\\\\\\

import express, { Request, Response } from 'express';
import { ObjectID, Collection } from 'mongodb'
import path from 'path';
import bcrypt from 'bcryptjs';
import client from './database/connectDB';
import { IGNORED_WORDS, EMAIL_REGEX, SortByProperties, ParseTerms } from './resources';
import { RecipeData, RecipeDataResult, IndexResult, IndexReference, User } from 'magellan';

//Constants
const PORT = Number(process.env.PORT) || 5000;
const VALID_MONGO_ID = /^[0-9a-fA-F]{24}$/;
const REACT_BUNDLE_PATH = path.resolve('./') + '/build/frontend';

//Store persistent connections to our database collections
let recipeCollection: Collection;
let indexCollection:  Collection;
let usersCollection:  Collection;

//Automatically connect to database
(async function connectToMongo() {
    try {
        const database = await client.connect();
        console.log('- Connected to Mongo cluster');

        //Save connections to the collections we will use later
        recipeCollection = database.db('recipeData').collection('recipes');
        indexCollection  = database.db('recipeData').collection('index');
        usersCollection  = database.db('userData').collection('users');
    }
    catch (err) {
        console.log('Error in connectToMongo:', err)
    }
})();

//Set up Express app
const app = express();
app.use(express.static(REACT_BUNDLE_PATH)); //Serve static React pages
app.use(express.urlencoded({ extended: true })); //Body parser

////////// PAGES \\\\\\\\\\

//Load a recipe
app.get('/api/recipe/:recipeid', async (req: Request, res: Response) => {
    try {
        const id = req.params.recipeid;

        //Check for valid recipe id string
        if (!VALID_MONGO_ID.test(id)) {
            res.json({ error: 'Recipe not found' });
        }
        else {
            //Valid id - grab recipe from database
            const result: RecipeDataResult | null = await recipeCollection.findOne(new ObjectID(id));

            if (!result) {
                res.json({ error: 'Recipe not found' });
            }
            //Recipe found - pass each data point
            else {
                const data: RecipeData = {
                    URL:          result.URL,
                    imageURL:     result.imageURL,
                    author:       result.author,
                    recipeName:   result.recipeName,
                    difficulty:   result.difficulty,
                    totalTime:    result.totalTime,
                    prepTime:     result.prepTime,
                    inactiveTime: result.inactiveTime,
                    activeTime:   result.activeTime,
                    cookTime:     result.cookTime,
                    yield:        result.yield,
                    ingredients:  result.ingredients,
                    directions:   result.directions,
                    source:       result.source
                };
                res.json(data);
            }
        }
    }
    catch (err) {
        console.log('Error in recipe route:', err);
    }
});

//Search for recipes
// Type 'name' searches by recipe name
// Type 'ing' searches by ingredient
// qty determines the number of results we want

app.get('/api/search/:type/:terms/:qty', async (req: Request, res: Response) => {
    try {
        console.time('  > Search execution time');
        const type = req.params.type;
        const terms = req.params.terms.toLowerCase();
        const limit = parseFloat(req.params.qty);
        
        //Search algorithm!
        let parsedTerms: string[] = [];

        //Convert the input to an array of search terms
        ParseTerms(terms, (word) => {
            if (!IGNORED_WORDS.includes(word) && word.length > 2) {
                parsedTerms.push(word);
            }
        });

        //Query the database if given a valid submission
        console.log(`- Executing search with type '${type}' and terms '${parsedTerms}'`);
        const numTerms = parsedTerms.length;

        if (!numTerms) {
            res.json({ error: 'No search results' });
            console.timeEnd('  > Search execution time');
        }
        else {
            //Place each term in a mongo expression
            let exprList = [];
            for (let i = 0; i < numTerms; i++) {
                exprList.push( { key: parsedTerms[i] } );
            }
            const query = { $or: exprList }; //Combine all expressions into a single 'or' query

            //Search!
            const results: IndexResult[] = await indexCollection.find(query).toArray();
            let initialResults: IndexReference[] = []; //Will hold our initial sorted results

            //No results
            if (!results.length) {
                res.json({ error: 'No search results' });
                console.timeEnd('  > Search execution time');
            }
            //Matches found
            else {
                //Combine the results into one array
                results.map(element => {
                    initialResults = initialResults.concat(element.recipes);
                });

                //Merge items with the same recipe id
                for (let j = 0; j < initialResults.length; j++) {
                    let current = initialResults[j];
                    
                    for (let k = j + 1; k < initialResults.length; k++) {
                        let next = initialResults[k];

                        //Duplicate id found - add the counts from the second one to the first
                        if (current.id === next.id) {
                            current.inName += next.inName;
                            current.inIngs += next.inIngs;
                            initialResults.splice(k, 1); //Remove this item
                        }
                    }
                }

                //Sort by whatever the user is looking for, then grab only the most relevant results
                type === 'name'
                    ? SortByProperties(initialResults, ['inName', 'inIngs'])
                    : SortByProperties(initialResults, ['inIngs', 'inName'])
                ;
                const topResults = initialResults.slice(0, limit);

                //Retrieve all info about each result from the database
                const resultIDs = topResults.map(
                    element => new ObjectID(element.id) //Save each id as an ObjectID
                );
                const finalQuery = { _id: { $in: resultIDs } };
                const dbResults: RecipeDataResult[] = await recipeCollection.find(finalQuery).toArray();

                //Add new properties to use in our final sort
                const finalResults = dbResults.map(element => {
                    let termsList = parsedTerms.slice(); //Create a copy of the search input

                    //Properties for name searches
                    // - Accuracy  = What portion of the search terms are in the name?
                    // - Brevity   = What percentage of the name is made of unique search terms?
                    // - Adjacency = How far apart are the search terms within the name?
                    // - Rand      = Random number to make items with identical scores appear in different orders each time
                    if (type === 'name') {
                        const name = element.recipeName.toLowerCase();
                        let termsPresent = 0;
                        let numWords = 0;
                        let foundTerms: string[] = [];

                        let adjacencyIdx = -1;
                        let maxDistance = 0;
    
                        //Determine the number of words in the recipe name
                        ParseTerms(name, (word, curIdx) => {
                            numWords++;

                            //Check if the word is a search term we haven't seen yet
                            let nextWordPos = termsList.indexOf(word);
                            let alreadyFound = foundTerms.includes(word);

                            if (nextWordPos > -1 && !alreadyFound) {
                                //Add the term to our list
                                termsPresent++;
                                termsList.splice(nextWordPos, 1);
                                foundTerms.push(word);

                                //Update/track adjacency information
                                if (adjacencyIdx < 0) adjacencyIdx = curIdx;
                                let dist = curIdx - adjacencyIdx;
                                if (dist > maxDistance) maxDistance = dist;
                                adjacencyIdx = curIdx;
                            }
                        });

                        //Add properties
                        element.accuracy  = (termsPresent * 1.0 / numTerms);
                        element.brevity   = (termsPresent * 1.0 / numWords);
                        element.adjacency = (maxDistance === 0)
                            ? 0.0
                            : (1.0 / maxDistance)
                        ;
                        element.rand      = Math.floor((Math.random() * 100) + 1);
                    }

                    //Properties for ingredient searches
                    // - Accuracy = What portion of the search terms are in the ingredient list?
                    // - Rand = Random number to make items with identical scores appear in different orders each time
                    else {                     
                        const ings = element.ingredients
                            .toString()
                            .toLowerCase()
                        ;
                        let ingsPresent = 0;

                        ParseTerms(ings, (word) => {
                            let nextIngPos = termsList.indexOf(word);
                            if (nextIngPos > -1) {
                                ingsPresent++;
                                termsList.splice(nextIngPos, 1);
                            }
                        });
                        element.accuracy = ingsPresent;
                        element.rand = Math.floor((Math.random() * 100) + 1);
                    }

                    element._id = element._id.toString();
                    return element;
                });

                //Sort the final results based on the search type
                type === 'name'
                    ? SortByProperties(finalResults, ['accuracy', 'adjacency', 'brevity', 'rand'])
                    : SortByProperties(finalResults, ['accuracy', 'rand'])
                ;

                //PRINT RESULTS FOR TESTING
                console.log('\nRESULTS:');
                finalResults.map(element => {
                    console.log(element._id, ':', element.recipeName);
                    console.log('Accuracy:', element.accuracy, ', Brevity:', element.brevity || 'N/A', ', Adjacency:', element.adjacency || 'N/A', ', Rand:', element.rand, '\n');
                });

                //Send back the top results as JSON
                res.json({ searchResults: finalResults });
                console.timeEnd('  > Search execution time');
            }
        }
    }
    catch (err) {
        console.log('Error in search route:', err);
    }
});

//Default/home page
app.get('*', (req: Request, res: Response) => {
    res.sendFile(REACT_BUNDLE_PATH + '/index.html');
});

////////// FORM HANDLERS \\\\\\\\\\

//Registration
app.post('/auth/register', async (req: Request, res: Response) => {
    try {
        const { email, password, confirmPassword } = req.body; //Retrieve the form inputs
        console.log('recieved registration attempt:', email, password);

        //Check for errors and store any found
        let errors = [];

        if (!email)           errors.push({ err: 'Please enter your email' });
        if (!password)        errors.push({ err: 'Please enter a new password' });
        if (!confirmPassword) errors.push({ err: 'Please confirm your password' });

        if (password && password.length < 8)   errors.push({ err: 'Your password must contain at least 8 characters' });
        if (password !== confirmPassword)      errors.push({ err: 'Both passwords must match' });
        if (email && !EMAIL_REGEX.test(email)) errors.push({ err: 'Invalid email. Make sure it is spelled correctly or try another one' });

        //If errors remain, send them to the page to be displayed
        if (errors.length) {
            res.json(errors);
        }

        //No errors -> try to register the user
        else {
            //Look for the email in the database
            const userExists = await usersCollection.findOne({ email: email });
            if (userExists) {
                errors.push({ err: 'Email already in use. Please try a different one' });
                res.json(errors);
            }
            //Email not found - they can be added
            else {
                //Salt + hash the password
                const salt   = await bcrypt.genSalt();
                const pwHash = await bcrypt.hash(password, salt);
                
                const user: User = {
                    email,
                    password: pwHash
                }

                //Add the user, redirect to home page, and flash a message indicating success
                await usersCollection.insertOne(user);
                res.redirect('/login');
            }
        }
    }
    catch (err) {
        console.log('Error in registration:', err);
    }
});

//Login requests
app.post('auth/login', async (req: Request) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
    }
    catch (err) {
        console.log('Error in login', err);
    }
});

////////// ERROR PAGES \\\\\\\\\\

//Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Error 404 - Page Not Found');
});

//Handle 500 errors
app.use((err: Error, req: Request, res: Response) => {
    console.error(err.stack); //Log error details
    res.status(500).send('Error 500 - Internal Server Error');
});

////////// LISTENER \\\\\\\\\\

//Server listens on native port, or on 5000 if in a local environment
const server = app.listen(PORT, () => {
    console.log('- Magellan server listening on port', PORT);
});
