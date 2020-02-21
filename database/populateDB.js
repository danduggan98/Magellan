//
// Populates the database with our JSON recipe data
//

//Connect to Mongo
const db = require('./dbConnect.js');
const connection = db.connectToMongo();

//Add FoodNetwork recipes