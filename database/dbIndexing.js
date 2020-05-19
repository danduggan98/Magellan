
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

                const numResults = trimmedResult.length;
                const ignoredWords = ['and', 'for', 'with', 'not', 'but', 'as', 'or', 'from', 'my', 'your', 'you', 'to', 'into', 'see', 'about',
                                      'because', 'instead', 'of', 'by', 'if', 'made', 'it', 'until', 'buy', 'the', 'kind', 'type', 'recipe',
                                      'follows', 'main', 'once', 'when', 'soon', 'before', 'plus', 'cup', 'teaspoon', 'tablespoon', 'quart',
                                      'gallon', 'liter', 'ounces', 'ounce', 'in', 'on', 'all', 'store', 'bought', 's', 't', 'don', 'won', 'can',
                                      'quarts', 'gallons', 'liters', 'cups', 'teaspoons', 'tablespoons', 'approximately', 'exactly', 'room',
                                      'temperature', 'inch', 'inches', 'thick', 'big', 'large', 'huge', 'more', 'need', 'needed', 'necessary',
                                      'only', 'self', 'more', 'better', 'plus', 'additional', 'i', 'll', 'we', 'recommended', 'a', 'preferably',
                                      'ideally', 'perfect', 'perfectly', 'even', 'at', 'least', 'cut', 'fat', 'their', 'our', 'mix', 'dice', 'diced',
                                      'chopped', 'finely', 'dry', 'wet', 'f', 'boiling', 'medium', 'small', 'el', 'la', 'removed', 'cleaned', 'dirty'
                                     ]; //STORE IN HELPER FUNCTION OF SEPERATE FILE, expand it and make alphabetical

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

                //Find and store all the unique words in our result
            });
        });
    }
    catch (err) {
        console.log('Error in "indexDB:"');
    }
})();
