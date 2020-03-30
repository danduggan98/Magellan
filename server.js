//
// Web Server
//

//TO-DO
// Finish search bar + search algorithm
// Mini search bar above recipe page
// Clean + finalize data in Mongo

// Host on Amazon
// Make db connection code a github secret
// Use Passport for authentication
// use nodemon
// Recipe submission page
// Sidebar with links
// Logins + saved recipes

//Set up Express app
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/'));

let database; //Maintains a persistent connection to the Mongo cluster
let recipes; //Persistent connection to our recipe collection

const ObjectId = require('mongodb').ObjectID;
const validMongoID = /^[0-9a-fA-F]{24}$/;

//Automatically connect to database, store the connection for reuse
(function connectToMongo() {
    const dbClient = require('./database/dbConnect.js').client;
    dbClient.connect((err, db) => {
        if (err) throw err;
        console.log('Connected to Mongo cluster');
        database = db; //Save the connection
        recipes = database.db('recipeData').collection('recipes'); //Save the recipe collection
    });
})();

////////// PAGES \\\\\\\\\\

//Load a recipe
app.get('/recipe/:recipeid', (req, res) => {
    const id = req.params.recipeid;

    //Check for invalid recipe id string
    if (!(validMongoID.test(id))) {
        res.json({ error: 'Recipe not found' });
    }
    //Potentially valid recipe id
    else {
        //Grab recipe info from database
        recipes.find(ObjectId(id)).toArray((err, result) => {
            if (err) throw err;

            //Recipe not found
            if (!result.length) {
                res.json({ error: 'Recipe not found' });
            }

            //Recipe found
            else {
                const data = result[0];

                //Pass each data point
                res.json({
                    URL:          data.URL,
                    imageURL:     data.imageURL,
                    author:       data.author,
                    recipeName:   data.recipeName,
                    difficulty:   data.difficulty,
                    totalTime:    data.totalTime,
                    prepTime:     data.prepTime,
                    inactiveTime: data.inactiveTime,
                    activeTime:   data.activeTime,
                    cookTime:     data.cookTime,
                    yield:        data.yield,
                    ingredients:  data.ingredients,
                    directions:   data.directions,
                    source:       data.source
                });
            }
        });
    }
});

//Search for recipes
app.get('/search/:terms', (req, res) => {
    const terms = req.params.terms;

    const query = //Search algorithm
        {recipeName: {$regex:`.*${terms}.*`}} //Does the recipe name contain the term?

    //Query the database
    recipes.find(query).toArray((err, result) => {
        if (err) throw err;

        if (!result.length) {
            res.json({ error: 'No search results' });
        }
        else {
            res.json({ searchResults: result });
        }
    });
});

//Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Error 404 - Page Not Found');
});

//Handle 500 errors
app.use((err, req, res, next) => {
    console.error(err.stack); //Log error details
    res.status(500).send('Error 500 - Internal Server Error');
});

//Server listens on native port, or on 3000 if in a local environment
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log('Magellan server listening on port', port);
});
