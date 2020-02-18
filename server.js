//Set up Express app
const express = require('express');
const app = express();
app.use(express.static(__dirname + '/'));

//Set up Mongo connection
const MongoClient = require('mongodb').MongoClient;
const mongoURI = 'mongodb+srv://dduggan:<GingerCAT90>@mealscraper-6n2np.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(mongoURI, { useNewUrlParser: true });

client.connect(err => {
    const collection = client.db("test").collection("devices");

    // perform actions on the collection object
    //client.close();
});

//Server listens on native port, or on 3000 if in a local environment
var port = process.env.PORT || 3000;
var server = app.listen(port, () => {
    console.log('Magellan server listening on port', port);
});
