//
// Web Server
//

//TO-DO
// Host on Amazon
// Add search bar functionality
// Clean + finalize data in Mongo
// Use Passport for authentication
// Recipe page

//Set up Express app
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs'); //Use EJS for dynamic HTML

let database; //Maintains a persistent connection to the Mongo cluster
const ObjectId = require('mongodb').ObjectID;

//Automatically connect to database, store the connection for reuse
(function connectToMongo() {
    const dbClient = require('./database/dbConnect.js').client;
    dbClient.connect((err, db) => {
        if (err) throw err;
        console.log('Connected to Mongo cluster');
        database = db; //Save the connection
    });
})();

////////// PAGES \\\\\\\\\\

//Default page - redirects to home
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Home Page
app.get('/home', (req, res) => {
    res.send('WHADUUUUPPPP');
});

//TESTING
app.get('/testreact', (req, res) => {
    res.json({ test: 'IT WORKED!!!' });
});

//Load a recipe
//HANDLE RECIPE NOT FOUND (avoid error 500, instead return not found page)
app.get('/recipe/:recipeid', (req, res) => {
    const recipes = database.db('recipeData').collection('recipes'); //Access the recipe list

    //Grab recipe info from database
    recipes.find(ObjectId(req.params.recipeid)).toArray((err, result) => {
        if (err) throw err;
        let recipeData = result[0];

        //Pass each data point to the ejs file
        res.render('recipe', {
            URL: recipeData.URL,
            imageURL: recipeData.imageURL,
            author: recipeData.author,
            recipeName: recipeData.recipeName,
            difficulty: recipeData.difficulty,
            totalTime: recipeData.totalTime,
            prepTime: recipeData.prepTime,
            inactiveTime: recipeData.inactiveTime,
            activeTime: recipeData.activeTime,
            cookTime: recipeData.cookTime,
            yield: recipeData.yield,
            ingredients: recipeData.ingredients,
            directions: recipeData.directions,
            source: recipeData.source
        });
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
