//
// Indexes the database to improve search performance
//

//  HOLY CHRIST ALMIGHTY REFACTOR THIS SO YOU CAN LIVE WITH YOURSELF AND SEEK FORGIVENESS

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

(function indexDB() {
    try {
        //Connect to the database
        require('dotenv').config();
        const connection = require('./dbConnect.js').client;

        connection.connect((err, database) => {
            if (err) throw err;

            const recipeDB = database.db('recipeData'); //Connect to our main database
            console.log('- Connected to Mongo cluster - indexing database now');

            //Get the database contents, and store all the unique words it contains
            process.stdout.write('  > Retrieving recipes from database ... ');

            recipeDB.collection('recipes').find({}).toArray((err, results) => {
                if (err) throw err;
                console.log('done');

                //Cut the results down to just the recipe name and ingredients
                // Remove unnecessary characters, concatenate the two, and store the index that seperates them
                process.stdout.write('  > Cleaning up recipe info ... ');

                const trimmedResults = results.map(element => {
                    let data = '';
                    let threshold = 0; //Index that seperates the name and ingredients

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
                        data: trimData(data),
                        threshold: threshold
                    }
                    return item;
                });
                console.log('done');

                //Find and store all the unique words in our result
                process.stdout.write('  > Finding all unique words ... ');
                const numResults = trimmedResults.length;
                let indexKeys = [];

                for (let i = 0; i < numResults; i++) {
                    const nextItem = trimmedResults[i].data;
                    const nextItemLen = nextItem.length;
                    let lastWordIndex = 0;

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
                console.log(indexKeys);
                console.log('done');

                //Create indexes
                /*process.stdout.write('  > Counting occurrences of unique words ... ');

                //Find the occurrences of each unique word
                const numRecipes = result.length;
                const numKeys = indexKeys.length;

                for (let l = 0; l < numKeys; l++) {

                    let searchWord = indexKeys[l];
                    let index = {
                        value: searchWord,
                        members: []
                    };

                    //Look through the data for this key
                    for (let m = 0; m < numRecipes; m++) {
                        let data = '';
                        let threshold = 0;
                        let name = result[m].recipeName;
                        let ings = result[m].ingredients;

                        if (name) {
                            data += name.toString().toLowerCase();
                            threshold = data.length;
                        }
                        if (ings) {
                            data += ings.toString().toLowerCase();
                            if (!name) threshold = data.length;
                        }

                        console.log(data);
                    }

                        for (let n = 0; n < name.length; n++) {
                            if (name.charAt(n) === ' ' || n === name.length) {
                                let nextWord = name.slice(lastWordIndex, n);
                                lastWordIndex = ++n;

                                if (nextWord === searchWord) {
                                    let id = result[m]._id;

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







                        ///////////////////////////////////////////////
                        if (name) {
                            name = name
                            lastWordIndex = 0;

                            for (let n = 0; n < name.length; n++) {
                                if (name.charAt(n) === ' ' || n === name.length) {
                                    let nextWord = name.slice(lastWordIndex, n);
                                    lastWordIndex = ++n;

                                    if (nextWord === searchWord) {
                                        let id = result[m]._id;

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
                                        let id = result[m]._id;

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

                //Store the indexes in the database
                // TO-DO

                //Create an index collection if it does not currently exist
                recipeDB.listCollections({name: 'index'}).next((err, coll) => {
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
                });*/

                console.log('done');
                database.close();
            });
        });
    }
    catch (err) {
        console.log('Error in "indexDB:"');
    }
})();
