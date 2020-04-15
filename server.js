//
// Web Server
//

//TO-DO
// Finish search bar + search algorithm
    // Make secondary sort something other than chef name (popularity?)
    // handle common misspellings? (potatos -> potatoes)

// Pull search results to a SearchResults component, limit the immediate number shown to <10
// Mini search bar above recipe page
// Clean + finalize data in Mongo (REMOVE DUPLICATES, ETC.)

// Make db connection code a (github?) secret, encrypt it!!!!!!!!!
// HOST ON AMAZON!!!!!!!!!!!!!!
// Use Passport for authentication
// Recipe submission page
// Sidebar with links
// Logins + saved recipes

// Add service worker for production
// Add unique keys to all react lists, ensure existing keys are unique
// Exclude ingredients
// Vegan, gluten-free, etc. notices

//Set up Express app
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/'));

let database; //Maintains a persistent connection to the Mongo cluster
let recipes; //Persistent connection to our recipe collection

const ObjectId = require('mongodb').ObjectID;
const validMongoID = /^[0-9a-fA-F]{24}$/;

//Automatically connect to database, store the connection for reuse
(function connectToMongo() {
    const dbClient = require('./database/dbConnect.js').client;
    dbClient.connect((err, db) => {
        if (err) throw err;
        console.log('- Connected to Mongo cluster');
        database = db; //Save the connection
        recipes = database.db('recipeData').collection('recipes'); //Save the recipe collection
    });
})();

////////// PAGES \\\\\\\\\\

//Load a recipe
app.get('/recipe/:recipeid', (req, res) => {
    const id = req.params.recipeid;

    //Check for invalid recipe id string
    if (!(validMongoID.test(id))) {
        res.json({ error: 'Recipe not found' });
    }
    //Potentially valid recipe id
    else {
        //Grab recipe info from database
        recipes.find(ObjectId(id)).toArray((err, result) => {
            if (err) throw err;

            //Recipe not found
            if (!result.length) {
                res.json({ error: 'Recipe not found' });
            }
            //Recipe found
            else {
                const data = result[0];

                //Pass each data point
                res.json({
                    URL:          data.URL,
                    imageURL:     data.imageURL,
                    author:       data.author,
                    recipeName:   data.recipeName,
                    difficulty:   data.difficulty,
                    totalTime:    data.totalTime,
                    prepTime:     data.prepTime,
                    inactiveTime: data.inactiveTime,
                    activeTime:   data.activeTime,
                    cookTime:     data.cookTime,
                    yield:        data.yield,
                    ingredients:  data.ingredients,
                    directions:   data.directions,
                    source:       data.source
                });
            }
        });
    }
});

//Search for recipes
// Type 'name' searches by recipe name,
// Type 'ing' searches by ingredient

app.get('/search/:type/:terms', (req, res) => {
    const type = req.params.type;
    const terms = req.params.terms.toLowerCase();
    console.time('  > Search execution time');

    //Search algorithm!
    //Parse individual search terms into a list
    let parsedTerms = [];
    let lastWordIndex = 0;
    const len = terms.length;

    for (let i = 0; i <= len; i++) {
        //Valid chars used to seperate search terms
        const seperators = [' ', '-', '/', ',', '+', '&']; //FAILS WITH /

        //Useless words to ignore
        const ignoredTerms = ['and', 'with', 'the', 'n', 'on', 'or', 'best', 'for', 'of', 'most', 'ever', 'my', 'our'];

        //Isolate properly seperated words
        if (seperators.includes(terms.charAt(i)) || i === len) {
            let nextWord = terms.slice(lastWordIndex, i);

            //Remove whitespace, symbols, quotes, and numbers
            nextWordClean = nextWord.trim().replace(/[!@#$%^*().'"1234567890]+/g, '');
            lastWordIndex = ++i; 

            if (!ignoredTerms.includes(nextWordClean)) {
                parsedTerms.push(nextWordClean);
            }
        }
    }

    console.log(`- Executing search with type '${type}' and terms '${parsedTerms}'`);

    //Place each term in a mongo regex expression for searching
    let exprList = [];
    let newPattern, newQuery;
    const numTerms = parsedTerms.length;

    for (let j = 0; j < numTerms; j++) {
        newPattern = new RegExp(`.*${parsedTerms[j]}.*`, 'i'); //Is the term anywhere in the string?

        //Search recipe names
        if (type === 'name') {
            newQuery = {recipeName: {$regex: newPattern}};
        }
        //Search the ingredient list
        else if (type === 'ing') {
            newQuery = {ingredients: {$elemMatch: {$elemMatch: {$regex: newPattern}}}};
        }
        exprList.push(newQuery);
    }

    //Query the database given a valid submission
    if (!numTerms || terms.length < 3) {
        res.json({ error: 'No search results' });
        console.timeEnd('  > Search execution time');
    }
    else {
        //Combine all expressions into a single query
        const query = { $or: exprList };

        //Search
        recipes.find(query).toArray((err, result) => {
            if (err) throw err;

            //No results
            if (!result.length) {
                res.json({ error: 'No search results' });
                console.timeEnd('  > Search execution time');
            }
            //Matches found
            else {

                //Determine how close each recipe is to the search query
                // Results which contain more of the given fields are ranked higher
                const numResults = result.length;
                let hasIngs, matches, name, ings, check;

                //Iterate through the search results
                for (let k = 0; k < numResults; k++) {
                    hasIngs = true;
                    matches = 0;

                    //Store the name and the ingredients, if there are any
                    name = result[k].recipeName;

                    if (result[k].ingredients)
                        ings = result[k].ingredients.toString(); //Stringify to avoid iterating through sections
                    else
                        hasIngs = false;

                    //Go through each term and assign the result an accuracy score
                    for (let l = 0; l < numTerms; l++) {
                        check = new RegExp(`.*${parsedTerms[l]}.*`, 'i'); //Is the term anywhere in the string?

                        //Check if the term is in the name (runs for both search types)
                        if (check.test(name)) {
                            matches++;
                        }
                        //Check if the term is in the ingredient list
                        if (type === 'ing' && hasIngs) { //Just for ingredient searches with actual ingredients
                            if (check.test(ings)) {
                                matches++;
                            }
                        }
                    }
                    result[k].accuracy = matches; //Add the number of 'hits' as a property on the result
                }

                //Sort the data by accuracy, send the response as JSON
                result.sort((a, b) => parseFloat(b.accuracy) - parseFloat(a.accuracy));
                res.json({ searchResults: result });
                console.timeEnd('  > Search execution time');
            }
        });
    }
});

//Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Error 404 - Page Not Found');
});

//Handle 500 errors
app.use((err, req, res, next) => {
    console.error(err.stack); //Log error details
    res.status(500).send('Error 500 - Internal Server Error');
});

//Server listens on native port, or on 3000 if in a local environment
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log('- Magellan server listening on port', port);
});
