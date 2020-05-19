
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

            //Get all contents from the database, and store all the unique words it contains
            console.log('Gathering list of unique words to index');
            let searchTerms = [];
            let recipeList;

            //Gather all the recipes
            recipeDB.collection('recipes').find({}).toArray((err, result) => {
                recipeList = result;

                //Cut the results down to just the recipe name and ingredient list
                let trimmedResult = recipeList.map(element => {
                    let trimmed = '';
                    if (element.recipeName) trimmed += element.recipeName.toString() + ' ';
                    if (element.ingredients) trimmed += element.ingredients.toString();
                    return trimmed;
                });

                //Remove all numbers, symbols, useless words, and extra spaces
                const numResults = trimmedResult.length;
                for (let i = 0; i < numResults; i++) {
                    trimmedResult[i] = trimmedResult[i].toLowerCase();
                    trimmedResult[i] = trimmedResult[i].replace(/[!@#$%^&*()-_+{}:;"'<>,.\[\]\/\\\|~`1234567890]+/g, ' ');
                    trimmedResult[i] = trimmedResult[i].replace(/\s+/g, ' ').trim(); //Take out extra spaces

                    console.log(result[i].recipeName);
                    console.log(result[i].ingredients);
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
