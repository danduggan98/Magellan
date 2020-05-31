"use strict";
//
// Web Server
//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//TO-DO
// Finish search bar + search algorithm
// Make tertiary sort something other than id (similarity/length? popularity?), make sort function standalone and dynamic
// Prioritize items where the search terms are grouped in order (e.g. search for 'potato salad' => 'German Potato Salad' > 'Sweet Potato Pecan Salad')
// Make plurals and singulars give same results (e.g. sandwich vs. sandwiches, leaf vs. leaves, salad vs salads, etc.)
// SANITIZE INPUTS DEAR GOD
// 'See all/more' option allows you to slide through sets of the data
// Search card - cut off long titles with ellipses, lower max height
// PORT TO TYPESCRIPT!!!
// - ES6 imports
// - Adhere to Crockford style conventions
// - Change package to run everything from the build folder
// Mini search bar above recipe page
// Change vs code format/line space settings
// SCRAPE + ADD TASTE OF HOME, BON APPETIT, AND OTHERS
// Name fixer should properly capitalize names with prefixes, e.g. 'McCargo', etc. (store prefix list in resources?)
// Figure out how to rebuild database while keeping customer recipes
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
//Imports
const express = require('express');
const mongo = require('mongodb');
const resources = require('./resources.js').default;
const dbConnect = require('./database/connectDB.js').default;
//Constants
const ObjectId = mongo.ObjectID;
let recipeCollection, indexCollection; //Persistent connections for each collection
const validMongoID = /^[0-9a-fA-F]{24}$/;
const PORT = process.env.PORT || 5000;
//Automatically connect to database, store the connection for reuse
(function connectToMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        const database = yield dbConnect.client.connect();
        console.log('- Connected to Mongo cluster');
        //Save connections to the collections we will use later
        recipeCollection = database.db('recipeData').collection('recipes');
        indexCollection = database.db('recipeData').collection('index');
    });
})();
//Set up Express app
const app = express();
app.use(express.static(__dirname + '/'));
////////// PAGES \\\\\\\\\\
//Load a recipe
app.get('/recipe/:recipeid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.recipeid;
    //Check for valid recipe id string
    if (!(validMongoID.test(id))) {
        res.json({ error: 'Recipe not found' });
    }
    else {
        //Valid id - grab recipe from database
        const result = yield recipeCollection.findOne(ObjectId(id));
        if (!result) {
            res.json({ error: 'Recipe not found' });
        }
        //Recipe found - pass each data point
        else {
            res.json({
                URL: result.URL,
                imageURL: result.imageURL,
                author: result.author,
                recipeName: result.recipeName,
                difficulty: result.difficulty,
                totalTime: result.totalTime,
                prepTime: result.prepTime,
                inactiveTime: result.inactiveTime,
                activeTime: result.activeTime,
                cookTime: result.cookTime,
                yield: result.yield,
                ingredients: result.ingredients,
                directions: result.directions,
                source: result.source
            });
        }
    }
}));
//Search for recipes
// Type 'name' searches by recipe name,
// Type 'ing' searches by ingredient
// qty determines the number of results we want
app.get('/search/:type/:terms/:qty', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.time('  > Search execution time');
    const type = req.params.type;
    const terms = req.params.terms.toLowerCase();
    const limit = parseFloat(req.params.qty);
    //Search algorithm!
    //Parse individual search terms into a list
    let parsedTerms = [];
    let lastWordIndex = 0;
    for (let i = 0; i <= terms.length; i++) {
        const seperators = resources.VALID_SEPERATORS; //Valid chars used to seperate search terms
        const ignoredTerms = resources.IGNORED_WORDS; //Useless words to ignore
        //Isolate properly seperated words
        if (seperators.includes(terms.charAt(i)) || i === terms.length) {
            let nextWord = terms.slice(lastWordIndex, i);
            //Remove whitespace, symbols, quotes, and numbers
            nextWordClean = nextWord.trim().replace(/[!@#$%^*(){}.'"1234567890]+/g, '');
            lastWordIndex = ++i;
            if (!ignoredTerms.includes(nextWordClean) && nextWordClean.length > 2) {
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
        let masterList = []; //Will hold our final sorted results
        //Place each term in a mongo expression
        let exprList = [];
        for (let i = 0; i < numTerms; i++) {
            exprList.push({ key: parsedTerms[i] });
        }
        const query = { $or: exprList }; //Combine all expressions into a single 'or' query
        //Search!
        const results = yield indexCollection.find(query).toArray();
        const numResults = results.length;
        //No results
        if (!numResults) {
            res.json({ error: 'No search results' });
            console.timeEnd('  > Search execution time');
        }
        //Matches found
        else {
            //Combine the results into one array
            results.map(element => { masterList = masterList.concat(element.recipes); });
            let numRecipes = masterList.length;
            //Merge items with the same recipe id
            for (let k = 0; k < numRecipes; k++) {
                let current = masterList[k];
                for (let l = k + 1; l < numRecipes; l++) {
                    let next = masterList[l];
                    //Duplicate id found - add the counts from the second one to the first
                    if (current.id === next.id) {
                        current.inName += next.inName;
                        current.inIngs += next.inIngs;
                        masterList.splice(l, 1); //Remove this item
                        numRecipes--;
                    }
                }
            }
            //Sort by whatever the user is looking for
            if (type === 'name') {
                //Name, then ingredients
                masterList.sort((a, b) => {
                    if (parseFloat(a.inName) === parseFloat(b.inName)) {
                        return parseFloat(b.inIngs) - parseFloat(a.inIngs);
                    }
                    return parseFloat(b.inName) - parseFloat(a.inName);
                });
            }
            else {
                //Ingredients, then name
                masterList.sort((a, b) => {
                    if (parseFloat(a.inIngs) === parseFloat(b.inIngs)) {
                        return parseFloat(b.nameCount) - parseFloat(a.nameCount);
                    }
                    return parseFloat(b.inIngs) - parseFloat(a.inIngs);
                });
            }
        }
        //Pull just the ids out of each result as strings
        const topResultsRaw = masterList.slice(0, limit).map(element => element.id + '');
        //Retrieve all info about each result from the database
        const topResults = topResultsRaw.map(element => ObjectId(element));
        const finalQuery = { _id: { $in: topResults } };
        const dbResults = yield recipeCollection.find(finalQuery).toArray();
        //Store the database results in the same order as the raw data
        const dbResultsRaw = dbResults.map(element => element._id + ''); //Pull out the ids as strings
        let finalResults = [];
        for (let m = 0; m < topResultsRaw.length; m++) {
            const next = topResultsRaw[m];
            for (let n = 0; n < dbResultsRaw.length; n++) {
                const current = dbResultsRaw[n];
                //Match found - add the full item to a final results array
                if (current === next) {
                    finalResults.push(dbResults[n]);
                    break;
                }
            }
        }
        console.log("DB DATA AFTER SORTING:");
        finalResults.slice(0, 9).map(element => { console.log(element._id, ' : ', element.recipeName); });
        //Send back the top results as JSON
        res.json({ searchResults: finalResults });
        console.timeEnd('  > Search execution time');
    }
}));
////////// FORM HANDLERS \\\\\\\\\\
//Login requests
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
}));
////////// ERROR PAGES \\\\\\\\\\
//Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Error 404 - Page Not Found');
});
//Handle 500 errors
app.use((err, req, res, next) => {
    console.error(err.stack); //Log error details
    res.status(500).send('Error 500 - Internal Server Error');
});
////////// LISTENER \\\\\\\\\\
//Server listens on native port, or on 5000 if in a local environment
const server = app.listen(PORT, () => {
    console.log('- Magellan server listening on port', PORT);
});
//# sourceMappingURL=server.js.map