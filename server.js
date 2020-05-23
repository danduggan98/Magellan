//
// Web Server
//

//TO-DO
// Finish search bar + search algorithm
    // Make secondary sort something other than chef name (popularity?)
    // Fix search to be more accurate
    // SANITIZE INPUTS DEAR GOD
    // 'See all/more' option allows you to slide through sets of the data
    // Search card - cut off long titles with ellipses, lower max height

// Mini search bar above recipe page
// Clean + finalize data in Mongo (REMOVE DUPLICATES, ETC.)
// SCRAPE + ADD TASTE OF HOME, BON APPETIT, AND OTHERS

// HOST ON AMAZON!!!!!!!!!!!!!!
// Use Passport for authentication
// Recipe submission page
// Sidebar with links (account, saved recipes, etc.)
// Logins + saved recipes

// Add unique keys to all react lists, ensure existing keys are unique
// Change all css pixel sizes to REM
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

    //Check for invalid recipe id string
    if (!(validMongoID.test(id))) {
        res.json({ error: 'Recipe not found' });
    }
    //Potentially valid recipe id
    else {
        //Grab recipe info from database
        const result = await recipeCollection.findOne(ObjectId(id));

        //Recipe not found
        if (!result) {
            res.json({ error: 'Recipe not found' });
        }
        //Recipe found
        else {
            //Pass each data point
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
            exprList.push(
                { key: parsedTerms[i] }
            );
        }
        const query = { $or: exprList }; //Combine all expressions into a single query

        //Search
        const results = await indexCollection.find(query).toArray();
        const numResults = results.length;

        //No results
        if (!numResults) {
            res.json({ error: 'No search results' });
            console.timeEnd('  > Search execution time');
        }
        //Matches found
        else {
            //Lazily combine the results into one array
            for (let j = 0; j < numResults; j++) {
                masterList = masterList.concat(results[j].recipes);
            }

            //Merge items with the same recipe id
            let numRecipes = masterList.length;

            for (let k = 0; k < numRecipes; k++) {
                let current = masterList[k];
                
                for (let l = k + 1; l < numRecipes; l++) {
                    let next = masterList[l];

                    //Duplicate id found - move the counts from the second one to the first
                    if (current.id === next.id) {
                        current.nameCount += next.nameCount;
                        current.ingredientCount += next.ingredientCount;

                        masterList.splice(k, 1); //Remove this item
                        numRecipes--;
                    }
                }
            }

            //Sort by whatever the user is looking for
            if (type === 'name') {
                //Name, then ingredients
                masterList.sort((a, b) => {
                    if (parseFloat(a.nameCount) === parseFloat(b.nameCount)) {
                        return parseFloat(b.ingredientCount) - parseFloat(a.ingredientCount);
                    }
                    return parseFloat(b.nameCount) - parseFloat(a.nameCount);
                });
            }
            else {
                //Ingredients, then name
                masterList.sort((a, b) => {
                    if (parseFloat(a.ingredientCount) === parseFloat(b.ingredientCount)) {
                        return parseFloat(b.nameCount) - parseFloat(a.nameCount);
                    }
                    return parseFloat(b.ingredientCount) - parseFloat(a.ingredientCount);
                });
            }
        }

        //Get the top results and pass their data as JSON
        const topResults = masterList.slice(0, limit).map(element => ObjectId(element.id));
        const finalResult = [];

        for (let i = 0; i < topResults.length; i++) {
            const nextRecipe = await recipeCollection.findOne(topResults[i]);
            finalResult.push(nextRecipe);
        }

        //Send back the sorted results
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
