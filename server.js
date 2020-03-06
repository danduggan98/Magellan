//
// Web Server
//

//Set up Express app
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/'));

//Automatically connect to Mongo database, store the connection for reuse
let database;

(function connectToMongo() {
    const dbClient = require('./database/dbConnect.js').client;
    dbClient.connect((err, db) => {
        if (err) throw err;
        console.log("Connected to Mongo cluster");
        database = db; //Store a persistent database connection
    });
})();

////////// PAGES \\\\\\\\\\

//Default page - redirects to home
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Home Page
app.get('/home', (req, res) => {
    res.send("WHADUUUUPPPP");
});

//Server listens on native port, or on 3000 if in a local environment
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Magellan server listening on port', port);
});
