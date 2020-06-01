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
        const connection = require('./connectDB.js').client;

        //Connect to our main database
        const database = await connection.connect();
        const recipeDB = database.db('recipeData');
        console.log('- Connected to Mongo cluster - indexing database now');

        //////////  STEP 1. Store all the unique words in the database  \\\\\\\\\\

        process.stdout.write('  > Retrieving recipes from database ... ');
        const results = await recipeDB.collection('recipes').find({}).toArray();
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

            return {
                id: element._id.toString(),
                data: trimData(data),
                threshold: threshold
            }
        });
        console.log('done');

        //Find and store all the unique words in our result
        process.stdout.write('  > Finding all unique words ... ');
        const numResults = trimmedResults.length;
        let lastWordIndex = 0;
        let indexKeys = []; //Stores the unique words

        for (let i = 0; i < numResults; i++) {
            const nextItem = trimmedResults[i].data;
            const nextItemLen = nextItem.length;

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
            lastWordIndex = 0;
        }
        console.log('done');

        //////////  STEP 2. Create indexes for each key  \\\\\\\\\\

        process.stdout.write('  > Counting occurrences of unique words ...');
        const numKeys = indexKeys.length;
        let indexes = []; //Stores our final list

        for (let i = 0; i < numKeys; i++) {
            const nextKey = indexKeys[i];

            let index = {
                key: nextKey, //The word
                recipes: [],  //All items that contain the word
                frequency: 0  //How many items contain the word
            };

            //Look through the data for this key
            for (let j = 0; j < numResults; j++) {
                const nextItem = trimmedResults[j].data;
                const nextItemLen = nextItem.length;

                const nextID = trimmedResults[j].id;
                const nextThreshold = trimmedResults[j].threshold;
                let lastWordIndex = 0;
                let nextWord = '';

                let name = false;
                let ings = false;

                //If this key is anywhere in the name, note it and skip to the ingredients
                for (let k = 0; k < nextThreshold; k++) {
                    if (nextItem.charAt(k) === ' ' || k === nextThreshold) {
                        nextWord = nextItem.slice(lastWordIndex, k);
                        lastWordIndex = ++k;

                        if (nextWord === nextKey) {
                            name = true;
                            break;
                        }
                    }
                }

                //If this word is anywhere in the ingredients, note it and searching
                lastWordIndex = nextThreshold;
                for (let l = nextThreshold; l < nextItemLen; l++) {
                    if (nextItem.charAt(l) === ' ' || l === nextItemLen) {
                        nextWord = nextItem.slice(lastWordIndex, l);
                        lastWordIndex = ++l;

                        if (nextWord === nextKey) {
                            ings = true;
                            break;
                        }
                    }
                }

                //Add the recipe to the index if the word was found anywhere
                if (name || ings) {
                    let indexEntry = {
                        id: nextID,
                        inName: name ? 1 : 0,
                        inIngs: ings ? 1 : 0
                    };
                    index.recipes.push(indexEntry);
                }
            }

            index.frequency = index.recipes.length;

            //Console progress indicator - adds a dot with each additional 10% complete
            if (i % Math.ceil((numKeys / 7)) === 0) process.stdout.write('.');

            indexes.push(index); //Save our result
        }
        console.log(' done');

        //////////  STEP 3. Store the indexes in the database  \\\\\\\\\\

        console.log('  > Storing indexes');
        const collName = 'index';
        const coll = await recipeDB.listCollections({name: collName}).next();

        //Delete the index collection if it already exists
        if (coll) {
            process.stdout.write('    * Found index collection. Deleting now ... ');
            await recipeDB.dropCollection(collName);
            console.log('done');
        }
        else {
            console.log('    * Index collection not found ');
        }

        //Create the index collection
        process.stdout.write('    * Creating index collection ... ');
        await recipeDB.createCollection(collName);
        console.log('done');

        //Add the data
        process.stdout.write('    * Adding indexes to database ... ');
        const idx = recipeDB.collection(collName);
        await idx.insertMany(indexes);

        console.log('done');
        console.timeEnd('- Indexing completed in');
        database.close();
    }
    catch (err) {
        console.log('\nError in indexDB:', err);
    }
})();