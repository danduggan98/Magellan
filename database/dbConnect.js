//Set up Mongo connection
const connectToMongo = function() {
    const MongoClient = require('mongodb').MongoClient;
    const mongoURI = 'mongodb+srv://dduggan:g8RpQ9yiE8Bw@mealscraper-6n2np.mongodb.net/test?retryWrites=true&w=majority';
    const client = new MongoClient(mongoURI, { useNewUrlParser: true });

    client.connect(err => {
        if (err) throw err;
        console.log("Connected to Mongo cluster");
    });
    return client;
}

module.exports = { connectToMongo };