//
// Web Server
//

//TO-DO
// Finish search bar + search algorithm
    // Make tertiary sort something other than id (similarity/length? popularity?)
    // Prioritize items where the search terms are grouped in order (e.g. search for 'potato salad' = 'German Potato Salad' > 'Sweet Potato Pecan Salad')
    // Make plurals and singulars give same results (e.g. sandwich vs. sandwiches, leaf vs. leaves, salad vs salads, etc.)
    // 'See all/more' option allows you to slide through sets of the data
    // Search card - cut off long titles with ellipses, but let hover extend it to see the whole thing
    //CACHE IMAGES IN PUBLIC FOLDER

// USE FIGMA TO MAKE PAGES CLEANER
// Change vs code format/line space settings so everything but JSON and YAML have 4 spaces
// SCRAPE + ADD TASTE OF HOME, BON APPETIT, AND OTHERS
// Name fixer should properly capitalize names with prefixes, e.g. 'McCargo', etc. (store prefix list in resources?)

// HOST ON AMAZON!!!!!!!!!!!!!!
// Use Passport for authentication
// Recipe submission page
// Sidebar with links (account, saved recipes, etc.)
// Logins + saved recipes

// Add unique keys to all react lists, ensure existing keys are unique
// Change all css pixel sizes to REM
// Let users change number of servings
// Exclude ingredients
// Vegan, gluten-free, etc. notices

////////// SETUP \\\\\\\\\\

import express, { Request, Response } from 'express';
import { ObjectID, Collection } from 'mongodb'
import path from 'path';
import client from './database/connectDB';
import { VALID_SEPERATORS, IGNORED_WORDS, SortByProperties } from './resources';
import { RecipeData, RecipeDataResult, IndexResult, IndexReference } from 'magellan';

//Constants
const PORT = Number(process.env.PORT) || 5000;
const VALID_MONGO_ID = /^[0-9a-fA-F]{24}$/;
const REACT_BUNDLE_PATH = path.resolve('./') + '/build/frontend';

//Store persistent connections to our database collections
let recipeCollection: Collection;
let indexCollection: Collection;

//Automatically connect to database
(async function connectToMongo() {
    try {
        const database = await client.connect();
        console.log('- Connected to Mongo cluster');

        //Save connections to the collections we will use later
        recipeCollection = database.db('recipeData').collection('recipes');
        indexCollection = database.db('recipeData').collection('index');
    }
    catch (err) {
        console.log('Error in connectToMongo:', err)
    }
})();

//Set up Express app to serve static React pages
const app = express();
app.use(express.static(REACT_BUNDLE_PATH));

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
        console.log('Error in recipe route:', err)
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
        //Parse individual search terms into a list
        let parsedTerms: string[] = [];
        let lastWordIndex = 0;

        for (let i = 0; i <= terms.length; i++) {

            //Isolate properly seperated words
            if (VALID_SEPERATORS.includes(terms.charAt(i)) || i === terms.length) {
                let nextWord = terms.slice(lastWordIndex, i);

                //Remove whitespace, symbols, quotes, and numbers
                let nextWordClean = nextWord.trim().replace(/[!@#$%^*(){}_:;<>\[\].'"1234567890]+/g, '');
                lastWordIndex = ++i;

                if (!IGNORED_WORDS.includes(nextWordClean) && nextWordClean.length > 2) {
                    parsedTerms.push(nextWordClean);
                }
            }
        }

        console.log(`- Executing search with type '${type}' and terms '${parsedTerms}'`);
        const numTerms = parsedTerms.length;

        //Query the database given a valid submission
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
            let masterList: IndexReference[] = []; //Will hold our final sorted results

            //No results
            if (!results.length) {
                res.json({ error: 'No search results' });
                console.timeEnd('  > Search execution time');
            }
            //Matches found
            else {
                //Combine the results into one array
                results.map(element => {
                    masterList = masterList.concat(element.recipes);
                });

                //Merge items with the same recipe id
                for (let k = 0; k < masterList.length; k++) {
                    let current = masterList[k];
                    
                    for (let l = k + 1; l < masterList.length; l++) {
                        let next = masterList[l];

                        //Duplicate id found - add the counts from the second one to the first
                        if (current.id === next.id) {
                            current.inName += next.inName;
                            current.inIngs += next.inIngs;
                            masterList.splice(l, 1); //Remove this item
                        }
                    }
                }

                //Sort by whatever the user is looking for, then grab only the most relevant results
                type === 'name'
                    ? SortByProperties(masterList, ['inName', 'inIngs'])
                    : SortByProperties(masterList, ['inIngs', 'inName'])
                ;
                const topResults = masterList.slice(0, limit);
                console.log(topResults.slice(0,9)); //JUST FOR TESTING

                //Retrieve all info about each result from the database
                const resultIDs = topResults.map(element => new ObjectID(element.id)); //Save each id as an ObjectID
                const finalQuery = { _id: { $in: resultIDs } };
                const dbResults: RecipeDataResult[] = await recipeCollection.find(finalQuery).toArray();

                //Add a 'brevity' value to each item, and convert the ObjectIDs to strings
                const finalResults = dbResults.map(element => {
                    if (type === 'name') {
                        const name = element.recipeName;
                        let numWords = 0;
    
                        //Determine the number of words in the recipe name
                        for (let i = 0; i < name.length; i++) {
                            if (name.charAt(i) === ' ' || i === name.length - 1) {
                                numWords++;
                            }
                        }
                        element.brevity = 1.0 / numWords; //Inversely proportional to length of name
                    }
                    element._id = element._id.toString();

                    return element;
                });

                //Sort the final results based on the search type
                type === 'name'
                    ? SortByProperties(finalResults, ['inName', 'brevity'])
                    : SortByProperties(finalResults, ['inIngs'])
                ;

                //JUST FOR TESTING
                console.log('\nRESULTS:');
                finalResults.slice(0, 9).map(element => { console.log(element._id, ':', element.recipeName) });

                //Send back the top results as JSON
                res.json({ searchResults: finalResults });
                console.timeEnd('  > Search execution time');
            }
        }
    }
    catch (err) {
        console.log('Error in search route:', err)
    }
});

//Default/home page
app.get('*', (req: Request, res: Response) => {
    res.sendFile(REACT_BUNDLE_PATH + '/index.html');
});

////////// FORM HANDLERS \\\\\\\\\\

//Login requests
app.post('/login', async (req: Request) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
    }
    catch (err) {
        console.log('Error in login route:', err)
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
