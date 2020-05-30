//
// Creates and exports a shared Mongo database client
//
//Point dotenv to the .env file in the root directory
import ENV_PATH from 'app-root-path';
import dotenv from 'dotenv';
dotenv.config({ path: ENV_PATH + '/.env' });
//Set up Mongo client
import { MongoClient } from 'mongodb';
let client;
const mongoUri = process.env.MONGO_URI;
if (mongoUri) {
    client = new MongoClient(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
else {
    throw new Error('Mongo URI not found in environment - unable to connect.');
}
export default { client };
//# sourceMappingURL=connectDB.js.map