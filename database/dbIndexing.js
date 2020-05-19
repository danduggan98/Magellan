//
// Indexes the database to improve search performance
//

const resources = require('../resources.js');

(function indexDB() {
    try {
        //Connect to the database
        require('dotenv').config();
        const connection = require('./dbConnect.js').client;

        connection.connect((err, database) => {
            if (err) throw err;
            console.log('- Connected to Mongo cluster - preparing to index database');

            const recipeDB = database.db('recipeData'); //Connect to our main database

            //Create an index collection if it does not currently exist
            recipeDB.listCollections({name: 'index'})
                .next((err, coll) => {
                    if (err) throw err;

                    if (!coll) {
                        //Create the new collection
                        recipeDB.createCollection('index', (err, res) => {
                            if (err) throw err;
                            console.log('-- Collection "index" not found. Creating it now');
                        });
                    }
                    else {
                        console.log('-- Found collection "index"');
                    }
                });

            //Get all contents from the database, and store all the unique words it contains
            console.log('- Gathering list of unique words to index');
            let recipeList;

            //Gather all the recipes
            recipeDB.collection('recipes').find({}).toArray((err, result) => {
                if (err) throw err;
                recipeList = result;

                //Cut the results down to just the recipe name and ingredient list
                let trimmedResult = recipeList.map(element => {
                    let trimmed = '';
                    if (element.recipeName) trimmed += element.recipeName.toString() + ' ';
                    if (element.ingredients) trimmed += element.ingredients.toString();
                    return trimmed;
                });

                const numResults = trimmedResult.length;
                const ignoredWords = resources.IGNORED_WORDS;

                //Remove all numbers, symbols, useless words, and extra spaces
                process.stdout.write('  > Cleaning up recipe info ... ');

                for (let i = 0; i < numResults; i++) {
                    trimmedResult[i] = trimmedResult[i].toLowerCase();
                    trimmedResult[i] = trimmedResult[i].replace(/[!@#$%^&*()-_+{}:;"'<>,.\[\]\/\\\|~`1234567890]+/g, ' '); //Numbers and symbols

                    //Remove all useless words
                    for (let j = 0; j < ignoredWords.length; j++) {
                        const rgxp = new RegExp(` +${ignoredWords[j]} +`, 'g');
                        trimmedResult[i] = trimmedResult[i].replace(rgxp, ' ');
                    }
                    trimmedResult[i] = trimmedResult[i].replace(/\s+/g, ' ').trim(); //Extra spaces
                }
                console.log('done');

                //Find and store all the unique words in our result
                const numTrimmedResults = trimmedResult.length;
                let lastWordIndex = 0;
                let indexKeys = [];

                //Iterate over the results
                process.stdout.write('  > Finding all unique words ... ');

                for (let j = 0; j < numTrimmedResults; j++) {
                    let nextResult = trimmedResult[j];
                    const nextResultLen = nextResult.length;

                    //Isolate each word seperated by spaces and store it if not seen yet
                    for (let k = 0; k < nextResultLen; k++) {
                        if (nextResult.charAt(k) === ' ' || k === nextResultLen) {
                            let nextWord = nextResult.slice(lastWordIndex, k);
                            lastWordIndex = ++k; //Move the index forward and skip the space
                            
                            //Add the word if unseen so far
                            if (!indexKeys.includes(nextWord) && nextWord !== '') {
                                indexKeys.push(nextWord);
                            }
                        }
                    }
                }
                console.log('done');
                console.log(indexKeys);
                database.close();
            });
        });
    }
    catch (err) {
        console.log('Error in "indexDB:"');
    }
})();
