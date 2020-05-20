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
            process.stdout.write('  > Retrieving recipes from database ... ');
            recipeDB.collection('recipes').find({}).toArray((err, result) => {
                if (err) throw err;
                console.log('done');
                recipeList = result;

                //Cut the results down to just the recipe name and ingredient list
                process.stdout.write('  > Cleaning up recipe info ... ');
                let trimmedResult = recipeList.map(element => {
                    let trimmed = '';
                    if (element.recipeName) trimmed += element.recipeName.toString() + ' ';
                    if (element.ingredients) trimmed += element.ingredients.toString();
                    return trimmed;
                });

                const numResults = trimmedResult.length;
                const ignoredWords = resources.IGNORED_WORDS;

                //Remove all numbers, symbols, useless words, and extra spaces
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

                //Create indexes
                process.stdout.write('  > Counting occurrences of unique words ... ');

                //Find the occurrences of each unique word
                const numRecipes = recipeList.length;
                const numKeys = indexKeys.length;

                for (let l = 0; l < numKeys; l++) {

                    let searchWord = indexKeys[l];
                    let index = {
                        value: searchWord,
                        members: []
                    };

                    //Look through the data for this key
                    for (let m = 0; m < numRecipes; m++) {
                        let name = recipeList[m].recipeName;
                        let ings = recipeList[m].ingredients;

                        if (name) {
                            name = name.toString().toLowerCase();
                            lastWordIndex = 0;

                            for (let n = 0; n < name.length; n++) {
                                if (name.charAt(n) === ' ' || n === name.length) {
                                    let nextWord = name.slice(lastWordIndex, n);
                                    lastWordIndex = ++n;

                                    if (nextWord === searchWord) {
                                        let id = recipeList[m]._id;

                                        if (!index.members.some(item => item.key === id)) {
                                            let newVal = {
                                                key: id,
                                                nameCount: 1,
                                                ingredientCount: 0
                                            };
                                            index.members.push(newVal);
                                        }
                                        else {
                                            index.members.find((item, i) => {
                                                if (item.key === id) {
                                                    index.members[i].nameCount++;
                                                    return true;
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                        
                        if (ings) {
                            ings = ings.toString().toLowerCase();
                            lastWordIndex = 0;

                            for (let o = 0; o < ings.length; o++) {
                                if (ings.charAt(o) === ' ' || o === ings.length) {
                                    let nextWord = ings.slice(lastWordIndex, o);
                                    lastWordIndex = ++o;

                                    if (nextWord === searchWord) {
                                        let id = recipeList[m]._id;

                                        if (!index.members.some(item => item.key === id)) {
                                            let newVal = {
                                                key: id,
                                                nameCount: 0,
                                                ingredientCount: 1
                                            };
                                            index.members.push(newVal);
                                        }
                                        else {
                                            index.members.find((item, i) => {
                                                if (item.key === id) {
                                                    index.members[i].ingredientCount++;
                                                    return true;
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                    console.log(index);
                }
                console.log('done');
                database.close();
            });
        });
    }
    catch (err) {
        console.log('Error in "indexDB:"');
    }
})();
