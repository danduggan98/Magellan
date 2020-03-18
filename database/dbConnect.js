//
// Creates a shared Mongo database client
//

//Set up Mongo client
const MongoClient = require('mongodb').MongoClient;
const mongoURI = 'mongodb+srv://dduggan:g8RpQ9yiE8Bw@mealscraper-6n2np.mongodb.net/test?retryWrites=true&w=majority&wtimeoutMS=0';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true});

module.exports = { client };
