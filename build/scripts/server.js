"use strict";
//
// Web Server
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
////////// SETUP \\\\\\\\\\
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const path_1 = __importDefault(require("path"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_session_1 = __importDefault(require("express-session"));
const connectDB_1 = __importDefault(require("./database/connectDB"));
const resources_1 = require("./resources");
//Constants
const PORT = Number(process.env.PORT) || 5000;
const VALID_MONGO_ID = /^[0-9a-fA-F]{24}$/;
const REACT_BUNDLE_PATH = path_1.default.resolve('./') + '/build/frontend';
//Store persistent connections to our database collections
let recipeCollection;
let indexCollection;
let usersCollection;
//Automatically connect to database
(function connectToMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const database = yield connectDB_1.default.connect();
            console.log('- Connected to Mongo cluster');
            //Save connections to the collections we will use later
            recipeCollection = database.db('recipeData').collection('recipes');
            indexCollection = database.db('recipeData').collection('index');
            usersCollection = database.db('userData').collection('users');
        }
        catch (err) {
            console.log('Error in connectToMongo:', err);
        }
    });
})();
//Set up Express app
const app = express_1.default();
app.use(express_1.default.static(REACT_BUNDLE_PATH)); //Serve static React pages
app.use(express_1.default.json()); //Body parser
app.use(express_session_1.default({
    secret: resources_1.RandomString(10),
    resave: true,
    saveUninitialized: true
}));
////////// PAGES \\\\\\\\\\
//Load a recipe
app.get('/api/recipe/:recipeid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.recipeid;
        //Check for valid recipe id string
        if (!VALID_MONGO_ID.test(id)) {
            res.json({ error: 'Recipe not found' });
        }
        else {
            //Valid id - grab recipe from database
            const result = yield recipeCollection.findOne(new mongodb_1.ObjectID(id));
            if (!result) {
                res.json({ error: 'Recipe not found' });
            }
            //Recipe found - pass each data point
            else {
                const data = {
                    URL: result.URL,
                    imageURL: result.imageURL,
                    author: result.author,
                    recipeName: result.recipeName,
                    difficulty: result.difficulty,
                    totalTime: result.totalTime,
                    prepTime: result.prepTime,
                    inactiveTime: result.inactiveTime,
                    activeTime: result.activeTime,
                    cookTime: result.cookTime,
                    yield: result.yield,
                    ingredients: result.ingredients,
                    directions: result.directions,
                    source: result.source
                };
                res.json(data);
            }
        }
    }
    catch (err) {
        console.log('Error in recipe route:', err);
    }
}));
//Search for recipes
// Type 'name' searches by recipe name
// Type 'ing' searches by ingredient
// qty determines the number of results we want
app.get('/api/search/:type/:terms/:qty', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.time('  > Search execution time');
        const type = req.params.type;
        const terms = req.params.terms.toLowerCase();
        const limit = parseFloat(req.params.qty);
        //Search algorithm!
        let parsedTerms = [];
        //Convert the input to an array of search terms
        resources_1.ParseTerms(terms, (word) => {
            if (!resources_1.IGNORED_WORDS.includes(word) && word.length > 2) {
                parsedTerms.push(word);
            }
        });
        //Query the database if given a valid submission
        console.log(`- Executing search with type '${type}' and terms '${parsedTerms}'`);
        const numTerms = parsedTerms.length;
        if (!numTerms) {
            res.json({ error: 'No search results' });
            console.timeEnd('  > Search execution time');
        }
        else {
            //Place each term in a mongo expression
            let exprList = [];
            for (let i = 0; i < numTerms; i++) {
                exprList.push({ key: parsedTerms[i] });
            }
            const query = { $or: exprList }; //Combine all expressions into a single 'or' query
            //Search!
            const results = yield indexCollection.find(query).toArray();
            let initialResults = []; //Will hold our initial sorted results
            //No results
            if (!results.length) {
                res.json({ error: 'No search results' });
                console.timeEnd('  > Search execution time');
            }
            //Matches found
            else {
                //Combine the results into one array
                results.map(element => {
                    initialResults = initialResults.concat(element.recipes);
                });
                //Merge items with the same recipe id
                for (let j = 0; j < initialResults.length; j++) {
                    let current = initialResults[j];
                    for (let k = j + 1; k < initialResults.length; k++) {
                        let next = initialResults[k];
                        //Duplicate id found - add the counts from the second one to the first
                        if (current.id === next.id) {
                            current.inName += next.inName;
                            current.inIngs += next.inIngs;
                            initialResults.splice(k, 1); //Remove this item
                        }
                    }
                }
                //Sort by whatever the user is looking for, then grab only the most relevant results
                type === 'name'
                    ? resources_1.SortByProperties(initialResults, ['inName', 'inIngs'])
                    : resources_1.SortByProperties(initialResults, ['inIngs', 'inName']);
                const topResults = initialResults.slice(0, limit);
                //Retrieve all info about each result from the database
                const resultIDs = topResults.map(element => new mongodb_1.ObjectID(element.id) //Save each id as an ObjectID
                );
                const finalQuery = { _id: { $in: resultIDs } };
                const dbResults = yield recipeCollection.find(finalQuery).toArray();
                //Add new properties to use in our final sort
                const finalResults = dbResults.map(element => {
                    let termsList = parsedTerms.slice(); //Create a copy of the search input
                    //Properties for name searches
                    // - Accuracy  = What portion of the search terms are in the name?
                    // - Brevity   = What percentage of the name is made of unique search terms?
                    // - Adjacency = How far apart are the search terms within the name?
                    // - Rand      = Random number to make items with identical scores appear in different orders each time
                    if (type === 'name') {
                        const name = element.recipeName.toLowerCase();
                        let termsPresent = 0;
                        let numWords = 0;
                        let foundTerms = [];
                        let adjacencyIdx = -1;
                        let maxDistance = 0;
                        //Determine the number of words in the recipe name
                        resources_1.ParseTerms(name, (word, curIdx) => {
                            numWords++;
                            //Check if the word is a search term we haven't seen yet
                            let nextWordPos = termsList.indexOf(word);
                            let alreadyFound = foundTerms.includes(word);
                            if (nextWordPos > -1 && !alreadyFound) {
                                //Add the term to our list
                                termsPresent++;
                                termsList.splice(nextWordPos, 1);
                                foundTerms.push(word);
                                //Update/track adjacency information
                                if (adjacencyIdx < 0)
                                    adjacencyIdx = curIdx;
                                let dist = curIdx - adjacencyIdx;
                                if (dist > maxDistance)
                                    maxDistance = dist;
                                adjacencyIdx = curIdx;
                            }
                        });
                        //Add properties
                        element.accuracy = (termsPresent * 1.0 / numTerms);
                        element.brevity = (termsPresent * 1.0 / numWords);
                        element.adjacency = (maxDistance === 0)
                            ? 0.0
                            : (1.0 / maxDistance);
                        element.rand = Math.floor((Math.random() * 100) + 1);
                    }
                    //Properties for ingredient searches
                    // - Accuracy = What portion of the search terms are in the ingredient list?
                    // - Rand = Random number to make items with identical scores appear in different orders each time
                    else {
                        const ings = element.ingredients
                            .toString()
                            .toLowerCase();
                        let ingsPresent = 0;
                        resources_1.ParseTerms(ings, (word) => {
                            let nextIngPos = termsList.indexOf(word);
                            if (nextIngPos > -1) {
                                ingsPresent++;
                                termsList.splice(nextIngPos, 1);
                            }
                        });
                        element.accuracy = ingsPresent;
                        element.rand = Math.floor((Math.random() * 100) + 1);
                    }
                    element._id = element._id.toString();
                    return element;
                });
                //Sort the final results based on the search type
                type === 'name'
                    ? resources_1.SortByProperties(finalResults, ['accuracy', 'adjacency', 'brevity', 'rand'])
                    : resources_1.SortByProperties(finalResults, ['accuracy', 'rand']);
                //PRINT RESULTS FOR TESTING
                console.log('\nRESULTS:');
                finalResults.map(element => {
                    console.log(element._id, ':', element.recipeName);
                    console.log('Accuracy:', element.accuracy, ', Brevity:', element.brevity || 'N/A', ', Adjacency:', element.adjacency || 'N/A', ', Rand:', element.rand, '\n');
                });
                //Send back the top results as JSON
                res.json({ searchResults: finalResults });
                console.timeEnd('  > Search execution time');
            }
        }
    }
    catch (err) {
        console.log('Error in search route:', err);
    }
}));
//Default/home page
app.get('*', (req, res) => {
    res.sendFile(REACT_BUNDLE_PATH + '/index.html');
});
////////// FORM HANDLERS \\\\\\\\\\
//Registration
app.post('/auth/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, confirmPassword } = req.body; //Retrieve the form inputs
        //Check for errors and store any found
        let errors = [];
        if (email) {
            if (!resources_1.EMAIL_REGEX.test(email)) {
                errors.push('Invalid email. Make sure it is spelled correctly or try another one');
            }
            else {
                const userExists = yield usersCollection.findOne({ email: email });
                if (userExists) {
                    errors.push('Email already in use. Please try a different one');
                }
            }
        }
        else {
            errors.push('Please enter your email');
        }
        if (password) {
            if (password.length < 8) {
                errors.push('Your password must contain at least 8 characters');
            }
            else {
                if (!confirmPassword) {
                    errors.push('Please confirm your password');
                }
                else if (password !== confirmPassword) {
                    errors.push('Both passwords must match');
                }
            }
        }
        else {
            errors.push('Please enter a new password');
        }
        //If there were errors, send them to the page. Otherwise, register the user
        if (errors.length) {
            res.json(errors);
        }
        else {
            //Salt + hash the password
            const salt = yield bcryptjs_1.default.genSalt();
            const pwHash = yield bcryptjs_1.default.hash(password, salt);
            const user = {
                email,
                password: pwHash,
                salt,
                savedRecipes: []
            };
            //Add the user and redirect to home page
            yield usersCollection.insertOne(user);
            res.json(errors);
        }
    }
    catch (err) {
        console.log('Error in registration:', err);
    }
}));
//Login requests
app.post('/auth/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body; //Retrieve the form inputs
        //Check for errors and store any found
        let errors = [];
        let userSalt = '';
        if (email) {
            const userExists = yield usersCollection.findOne({ email: email });
            if (userExists) {
                userSalt = userExists.salt;
            }
            else {
                errors.push('Email not found. Make sure it is spelled correctly or try another one');
            }
        }
        else {
            errors.push('Please enter your email');
        }
        if (!password) {
            errors.push('Please enter your password');
        }
        if (errors.length) {
            res.json(errors);
        }
        else {
            //Hash the given password
            const pwHash = yield bcryptjs_1.default.hash(password, userSalt);
            //Search for the user and redirect if the credentials match
            const validated = yield usersCollection.findOne({
                email: email,
                password: pwHash
            });
            if (!validated)
                errors.push('Incorrect password. Please try again');
            res.json(errors);
        }
    }
    catch (err) {
        console.log('Error in login:', err);
    }
}));
////////// ERROR PAGES \\\\\\\\\\
//Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Error 404 - Page Not Found');
});
//Handle 500 errors
app.use((err, req, res) => {
    console.error(err.stack); //Log error details
    res.status(500).send('Error 500 - Internal Server Error');
});
////////// LISTENER \\\\\\\\\\
//Server listens on native port, or on 5000 if in a local environment
const server = app.listen(PORT, () => {
    console.log('- Magellan server listening on port', PORT);
});
