//
// Web Server
//

//TO-DO
// Finish search bar + search algorithm
    // Filter helper words (and, with, or, etc.) before search takes place
    // Make secondary sort something other than chef name (popularity?)
    // Tweak algo to allow ingredient search as well
// Mini search bar above recipe page
// Clean + finalize data in Mongo (REMOVE DUPLICATES, ETC.)

// Host on Amazon
// Make db connection code a github secret
// Use Passport for authentication
// Recipe submission page
// Sidebar with links
// Logins + saved recipes

// Add service worker for production
// Add unique keys to all react lists, ensure existing keys are unique
// Search by/exclude ingredients
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
        console.log('Connected to Mongo cluster');
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
    const terms = req.params.terms;

    //Search algorithm!

    //Determine which document field to use based on the search type
    let field;
    switch (type) {
        case 'name':
            field = 'recipeName'; break;
        case 'ing':
            field = 'ingredients'; break;
        default:
            field = 'recipeName'; break;
    }

    //Parse individual search terms into a list
    let parsedTerms = [];
    let lastWordIndex = 0;
    const len = terms.length;

    for (let i = 0; i <= len; i++) {
        //Lazy attempt to handle bad inputs, ignore garbage characters
        const seperators = [' ', '  ', '   ', '-', '/', ',', '+', '.', "'", '"', '(', ')', '&', '%'];

        if (seperators.includes(terms.charAt(i)) || i === len) {
            let nextWord = terms.slice(lastWordIndex, i);
            lastWordIndex = ++i;
            parsedTerms.push(nextWord);
        }
    }

    //Place each term in a mongo regex expression for searching
    let exprList = [];
    for (let j = 0; j < parsedTerms.length; j++) {
        let newPattern = new RegExp(`.*${parsedTerms[j]}.*`, 'i');
        let newQuery = { [field] : {$regex: newPattern}};
        exprList.push(newQuery);
    }

    //Combine all expressions into a single query
    const query = { $or: exprList };

    //Query the database
    recipes.find(query).toArray((err, result) => {
        if (err) throw err;

        //No results
        if (!result.length) {
            res.json({ error: 'No search results' });
        }
        //Matches found
        else {

            //Determine how close each recipe name is to the search query
            // Results which contain more of the given fields are ranked higher
            //WILL NEED TWEAKING TO HANDLE INGREDIENT SEARCHES
            const numTerms = parsedTerms.length;
            const numResults = result.length;
            let matches = 0, check = '';

            for (let k = 0; k < numResults; k++) {
                for (l = 0; l < numTerms; l++) {
                    check = new RegExp(`.*${parsedTerms[l]}.*`, 'i');
                    if (check.test(result[k].recipeName)) {
                        matches++;
                    }
                }
                result[k].accuracy = matches;
                matches = 0;
            }

            //Sort + send the data
            result.sort((a, b) => parseFloat(b.accuracy) - parseFloat(a.accuracy));
            res.json({ searchResults: result });
        }
    });
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
    console.log('Magellan server listening on port', port);
});
