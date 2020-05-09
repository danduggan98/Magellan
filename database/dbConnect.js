//
// Creates a shared Mongo database client
//

//Set up Mongo client
const MongoClient = require('mongodb').MongoClient;
const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true});

module.exports = { client };
