"use strict";
//
// Creates and exports a shared Mongo database client
//
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Point dotenv to the .env file in the root directory
const app_root_path_1 = __importDefault(require("app-root-path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: app_root_path_1.default + '/.env' });
//Set up Mongo client if our environment URI is found
const mongodb_1 = __importDefault(require("mongodb"));
const mongoURI = process.env.MONGO_URI;
let client;
if (mongoURI) {
    client = new mongodb_1.default.MongoClient(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('- Retrieved Mongo client');
}
else {
    throw new Error('Mongo URI not found in environment - unable to connect.');
}
exports.default = client;
