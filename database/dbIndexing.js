
(function indexDB() {
    try {
        //Connect to the database
        require('dotenv').config();
        const connection = require('./dbConnect.js').client;

        connection.connect((err, database) => {
            if (err) throw err;
            console.log('Connected to Mongo cluster - preparing to index database');

            const recipeDB = database.db('recipeData'); //Connect to our main database

            //Create an index collection if it does not currently exist
            recipeDB.listCollections({name: 'index'})
                .next((err, coll) => {
                    if (err) throw err;

                    if (!coll) {
                        //Create the new collection
                        recipeDB.createCollection('index', (err, res) => {
                            if (err) throw err;
                            console.log('Collection "index" not found. Creating it now');
                        });
                    }
                    else {
                        console.log('Found collection "index"');
                    }
                });

            //Get all contents from the database
            console.log('Gathering database terms');
            let searchTerms = [];

            //Go through each recipe's name and ingredients, and store anything that hasn't been seen yet
            recipeDB.collection('recipes').find({}).toArray((err, result) => {
                let trimmedResult = result.map(element => {
                    let elName = element.recipeName;
                    let elIngs = element.ingredients;

                    let trimmed = '';
                    if (elName) trimmed += elName.toString() + ' ';
                    if (elIngs) trimmed += elIngs.toString();

                    return trimmed;
                });

                //Remove all numbers, symbols, and useless words
                const numResults = trimmedResult.length;
                for (let i = 0; i < numResults; i++) {
                    trimmedResult[i] = trimmedResult[i].replace(/[!@#$%^&*()-+{}:;"'<>,.~`1234567890]+/g, ' ');
                    trimmedResult[i] = trimmedResult[i].replace(/\[|\]/g, ' ');
                    console.log(trimmedResult[i]);
                }
                //console.log(trimmedResult);
            });
        });
    }
    catch (err) {
        console.log('Error in "indexDB:"');
    }
})();
