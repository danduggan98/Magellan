//Set up Mongo client
const MongoClient = require('mongodb').MongoClient;
const mongoURI = 'mongodb+srv://dduggan:g8RpQ9yiE8Bw@mealscraper-6n2np.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(mongoURI, { useNewUrlParser: true });

module.exports = { client };
