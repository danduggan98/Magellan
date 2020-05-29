"use strict";
//
// Creates a shared Mongo database client
//
//Point dotenv to the .env file in the root directory
const envPath = require('./app-root-path') + '/.env';
require('./dotenv').config({ path: envPath });
//Set up Mongo client
const MongoClient = require('./mongodb').MongoClient;
const mongoURI = process.env.MONGO_URI;
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = { client };
//# sourceMappingURL=connectDB.js.map