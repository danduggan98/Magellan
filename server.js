//
// Web Server
//

//TO-DO
// Finish search bar + search algorithm
    // Make secondary sort something other than chef name (popularity?)
    // Make plurals and singulars give same results (i.e. sandwich vs. sandwiches, leaf vs. leaves, salad vs salads, etc.)
    // Fix search to be more accurate
    // SANITIZE INPUTS DEAR GOD
    // 'See all/more' option allows you to slide through sets of the data
    // Search card - cut off long titles with ellipses, lower max height

// Mini search bar above recipe page
// Clean + finalize data in Mongo (REMOVE DUPLICATES, ETC.)
// SCRAPE + ADD TASTE OF HOME, BON APPETIT, AND OTHERS
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
const express   = require('express');
const mongo     = require('mongodb');
const resources = require('./resources.js');
const dbConnect = require('./database/dbConnect.js');

//Constants
const ObjectId = mongo.ObjectID;
let recipeCollection, indexCollection; //Persistent connections for each collection
const validMongoID = /^[0-9a-fA-F]{24}$/;
const port = process.env.PORT || 5000;

//Automatically connect to database, store the connection for reuse
(async function connectToMongo() {
    const database = await dbConnect.client.connect();
    console.log('- Connected to Mongo cluster');

    //Save connections to the collections we will use later
    recipeCollection = database.db('recipeData').collection('recipes');
    indexCollection = database.db('recipeData').collection('index');
})();

//Set up Express app
const app = express();
app.use(express.static(__dirname + '/'));

////////// PAGES \\\\\\\\\\

//Load a recipe
app.get('/recipe/:recipeid', async (req, res) => {
    const id = req.params.recipeid;

    //Check for valid recipe id string
    if (!(validMongoID.test(id))) {
        res.json({ error: 'Recipe not found' });
    }
    else {
        //Valid id - grab recipe from database
        const result = await recipeCollection.findOne(ObjectId(id));

        if (!result) {
            res.json({ error: 'Recipe not found' });
        }
        //Recipe found - pass each data point
        else {
            res.json({
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
            });
        }
    }
});

//Search for recipes
// Type 'name' searches by recipe name,
// Type 'ing' searches by ingredient
// qty determines the number of results we want

app.get('/search/:type/:terms/:qty', async (req, res) => {
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
            exprList.push( { key: parsedTerms[i] } );
        }
        const query = { $or: exprList }; //Combine all expressions into a single 'or' query

        //Search!
        const results = await indexCollection.find(query).toArray();
        const numResults = results.length;

        //No results
        if (!numResults) {
            res.json({ error: 'No search results' });
            console.timeEnd('  > Search execution time');
        }
        //Matches found
        else {
            //Combine the results into one array
            for (let j = 0; j < numResults; j++) {
                let list = results[j].recipes;
                list.map(element => { element.id = element.id.toString() }); //Coerce the ids to strings
                masterList = masterList.concat(list);
            }
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

        //Retrieve all info about each result from the database
        const topResults = masterList.slice(0, limit).map(element => ObjectId(element.id));
        const finalQuery = { _id: { $in: topResults } };
        const finalResult = await recipeCollection.find(finalQuery).toArray();

        //Send back the top results as JSON
        res.json({ searchResults: finalResult });
        console.timeEnd('  > Search execution time');
    }
});

////////// FORM HANDLERS \\\\\\\\\\

//Login requests
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
});

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
const server = app.listen(port, () => {
    console.log('- Magellan server listening on port', port);
});
