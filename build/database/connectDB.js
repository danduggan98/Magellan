//
// Creates and exports a shared Mongo database client
//
//Point dotenv to the .env file in the root directory
import envPath from 'app-root-path';
import dotenv from 'dotenv';
dotenv.config({ path: envPath + '/.env' });
//Set up Mongo client if our environment URI is found
import mongodb from 'mongodb';
const mongoURI = process.env.MONGO_URI;
let client;
if (mongoURI) {
    client = new mongodb.MongoClient(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('- Retrieved Mongo client');
}
else {
    throw new Error('Mongo URI not found in environment - unable to connect.');
}
export default client;
