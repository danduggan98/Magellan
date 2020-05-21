//
// Indexes the database to improve search performance
//

const resources = require('../resources.js');

//Trim off unnecessary characters from a string
function trimData(data) {
    let trimmed = data.toString().toLowerCase();
    trimmed = trimmed.replace(/[!@#$%^&*()-_+{}:;"'<>,.\[\]\/\\\|~`1234567890]+/g, ' '); //Remove numbers and symbols

    const ignoredWords = resources.IGNORED_WORDS;

    for (let i = 0; i < ignoredWords.length; i++) {
        const rgxp = new RegExp(` +${ignoredWords[i]} +`, 'g');
        trimmed = trimmed.replace(rgxp, ' ');
    }
    return trimmed.replace(/\s+/g, ' ').trim(); //Remove extra spaces
}

//Main indexing function - runs automatically
(async function indexDB() {
    try {
        console.time('- Indexing completed in');

        //Connect to the database client
        require('dotenv').config();
        const connection = require('./dbConnect.js').client;

        //Connect to our main database
        const database = await connection.connect();
        const recipeDB = database.db('recipeData');
        console.log('- Connected to Mongo cluster - indexing database now');

        //Get the database contents, and store all the unique words it contains
        process.stdout.write('  > Retrieving recipes from database ... ');
        const results = await recipeDB.collection('recipes').find({}).toArray();
        console.log('done');

        //Cut the results down to just the recipe name and ingredients
        // Remove unnecessary characters, concatenate the two, and store the index that seperates them
        process.stdout.write('  > Cleaning up recipe info ... ');
        const trimmedResults = results.map(element => {
            let data = '';
            let threshold = 0; //Index that seperates the name and ingredients

            const recipeID = element._id;
            const name = element.recipeName;
            const ings = element.ingredients;

            if (name) {
                data += name + ' ';
                threshold = data.length;
            }
            if (ings) {
                data += ings;
                if (!name) threshold = data.length;
            }

            let item = {
                id: recipeID,
                data: trimData(data),
                threshold: threshold
            }
            return item;
        });
        console.log('done');

        //Find and store all the unique words in our result
        process.stdout.write('  > Finding all unique words ... ');
        const numResults = trimmedResults.length;
        let lastWordIndex = 0;
        let indexKeys = [];

        for (let i = 0; i < numResults; i++) {
            const nextItem = trimmedResults[i].data;
            const nextItemLen = nextItem.length;
            lastWordIndex = 0;

            //Isolate each word seperated by spaces and store it if not seen yet
            for (let j = 0; j < nextItemLen; j++) {
                if (nextItem.charAt(j) === ' ' || j === nextItemLen) {
                    let nextWord = nextItem.slice(lastWordIndex, j);
                    lastWordIndex = ++j; //Move the index forward and skip the space
                    
                    //Add the word if unseen so far
                    if (!indexKeys.includes(nextWord) && nextWord !== '') {
                        indexKeys.push(nextWord);
                    }
                }
            }
        }
        console.log('done');

        //Create indexes for each key
        process.stdout.write('  > Counting occurrences of unique words ...');
        const numKeys = indexKeys.length;
        let indexes = []; //Stores our final list

        for (let i = 0; i < 10/*numKeys*/; i++) {
            const nextKey = indexKeys[i];

            let index = {
                key: nextKey,
                recipes: []
            };

            //Look through the data for this key
            for (let j = 0; j < numResults; j++) {
                const nextID = trimmedResults[j].id;
                const nextItem = trimmedResults[j].data;
                const nextThreshold = trimmedResults[j].threshold;
                const nextItemLen = nextItem.length;

                for (let k = 0; k < nextItemLen; k++) {
                    lastWordIndex = 0;

                    if (nextItem.charAt(k) === ' ' || k === nextItemLen) {
                        const nextWord = nextItem.slice(lastWordIndex, k);
                        lastWordIndex = ++k;

                        //If the key is found, store its information in the index
                        if (nextWord === nextKey) {

                            //Recipe ID not in the index yet - add it
                            if (!index.recipes.some(item => item.key === nextID)) {
                                const indexEntry = {
                                    recipe: nextID,
                                    nameCount: (k < nextThreshold ? 1 : 0),
                                    ingredientCount: (k >= nextThreshold ? 1 : 0)
                                };
                                index.recipes.push(indexEntry);
                            }

                            //Recipe ID already in the index - increment the appropriate counter
                            else {
                                await index.recipes.find((item, l) => {
                                    if (item.recipe === nextID) {
                                        k < nextThreshold ?
                                            index.recipes[l].nameCount++
                                            : index.recipes[l].ingredientCount++;
                                        return true;
                                    }
                                });
                            }
                        }
                    }
                }
            }

            //Progress indicator - adds a dot with each additional 10% complete
            if (i % Math.ceil((numKeys / 10)) === 0) process.stdout.write('.');

            indexes.push(index); //Save our result
        }
        console.log(' done');

        //Store the indexes in the database
        console.log('  > Adding indexes to database');
        const coll = await recipeDB.listCollections({name: 'index'}).next();

        //Delete the index collection if it already exists
        if (coll) {
            process.stdout.write('    * Found index collection. Deleting now ... ');
            await recipeDB.dropCollection('index');
            console.log('done');
        }
        else {
            console.log('    * Index collection not found ');
        }

        //Create the index collection
        process.stdout.write('    * Creating index collection ... ');
        await recipeDB.createCollection('index');
        console.log('done');

        //Add the data
        process.stdout.write('    * Adding indexes to database ... ');
        const idx = recipeDB.collection('index');
        const numIndexes = indexes.length;
    
        for (let i = 0; i < numIndexes; i++) {
            await idx.insertOne(indexes[i]);
        }

        console.log('done');
        console.timeEnd('- Indexing completed in');
        database.close();
    }
    catch (err) {
        console.log('\nError in indexDB:', err);
    }
})();
