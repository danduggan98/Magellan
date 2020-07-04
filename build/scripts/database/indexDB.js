"use strict";
//
// Indexes the database to improve search performance
//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDB_1 = __importDefault(require("./connectDB"));
const resources_1 = require("../resources");
//Main indexing function - runs automatically
(function indexDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.time('- Indexing completed in');
            //Connect to our main database
            const database = yield connectDB_1.default.connect();
            const recipeDB = database.db('recipeData');
            console.log('- Connected to Mongo cluster - indexing database now');
            //////////  STEP 1. Store all the unique words in the database  \\\\\\\\\\
            process.stdout.write('  > Retrieving recipes from database ... ');
            const results = yield recipeDB.collection('recipes').find({}).toArray();
            console.log('done');
            //Cut the results down to just the recipe name and ingredients
            // Concatenate the two and store the index that seperates them
            process.stdout.write('  > Condensing recipe info ... ');
            const condensedResults = results.map(element => {
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
                    if (!name)
                        threshold = data.length;
                }
                let nextIndex = {
                    id: element._id.toString(),
                    data: data.toLowerCase(),
                    threshold: threshold
                };
                return nextIndex;
            });
            console.log('done');
            //Find and store all the unique words in our result
            process.stdout.write('  > Finding all unique words ... ');
            const numResults = condensedResults.length;
            let lastWordIndex = 0;
            let indexKeys = []; //Stores the unique words
            for (let i = 0; i < numResults; i++) {
                const nextItem = condensedResults[i].data;
                const nextItemLen = nextItem.length;
                //Isolate each word and store it if not seen yet
                for (let j = 0; j <= nextItemLen; j++) {
                    if (resources_1.VALID_SEPERATORS.includes(nextItem.charAt(j)) || j === nextItemLen) {
                        let nextWordRaw = nextItem.slice(lastWordIndex, j);
                        let nextWord = nextWordRaw
                            .trim()
                            .replace(resources_1.SYMBOL_LIST, '');
                        lastWordIndex = ++j; //Move the index forward and skip the space
                        //Add the word if unseen so far and not in our blacklist
                        if (!resources_1.IGNORED_WORDS.includes(nextWord) && !indexKeys.includes(nextWord) && nextWord !== '') {
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
                    key: nextKey,
                    recipes: [],
                    frequency: 0 //How many items contain the word
                };
                //Look through the data for this key
                for (let j = 0; j < numResults; j++) {
                    const nextItem = condensedResults[j].data;
                    const nextItemLen = nextItem.length;
                    const nextID = condensedResults[j].id;
                    const nextThreshold = condensedResults[j].threshold;
                    let lastWordIndex = 0;
                    let nextWord = '';
                    let name = false;
                    let ings = false;
                    //If this key is anywhere in the name, note it and skip to the ingredients
                    for (let k = 0; k <= nextThreshold; k++) {
                        if (resources_1.VALID_SEPERATORS.includes(nextItem.charAt(k)) || k === nextThreshold) {
                            nextWord = nextItem.slice(lastWordIndex, k)
                                .trim()
                                .replace(resources_1.SYMBOL_LIST, '');
                            lastWordIndex = ++k;
                            if (nextWord === nextKey) {
                                name = true;
                                break;
                            }
                        }
                    }
                    //If this word is anywhere in the ingredients, note it and stop searching
                    lastWordIndex = nextThreshold;
                    for (let l = nextThreshold; l <= nextItemLen; l++) {
                        if (resources_1.VALID_SEPERATORS.includes(nextItem.charAt(l)) || l === nextItemLen) {
                            nextWord = nextItem.slice(lastWordIndex, l)
                                .trim()
                                .replace(resources_1.SYMBOL_LIST, '');
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
                //Save our result
                index.frequency = index.recipes.length;
                indexes.push(index);
                //Console progress indicator - adds a dot with each additional 10% complete
                if (i % Math.ceil((numKeys / 7)) === 0)
                    process.stdout.write('.');
            }
            console.log(' done');
            //////////  STEP 3. Store the indexes in the database  \\\\\\\\\\
            console.log('  > Storing indexes');
            const COLL_NAME = 'index';
            const collExists = yield recipeDB.listCollections({ name: COLL_NAME }).next();
            //Create the index collection if it does not already exist
            if (!collExists) {
                process.stdout.write('    * Index collection not found. Creating now ... ');
                yield recipeDB.createCollection(COLL_NAME);
                console.log('done');
            }
            else {
                console.log('    * Found the Index collection');
            }
            const indexColl = recipeDB.collection(COLL_NAME);
            process.stdout.write('    * Adding indexes to database ...');
            //Insert any recipes that don't already exist
            let count = 0;
            yield Promise.all(indexes.map((idx) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield indexColl.updateOne({ key: idx.key }, { $setOnInsert: Object.assign({}, idx) }, { upsert: true });
                    if ((++count) % Math.ceil((indexes.length / 7)) === 0)
                        process.stdout.write('.'); //Track progress
                }
                catch (err) {
                    console.log('Error adding item to database:', err);
                }
            })));
            console.log(' done');
            console.timeEnd('- Indexing completed in');
            database.close();
        }
        catch (err) {
            console.log('\nError in indexDB:', err);
        }
    });
})();
