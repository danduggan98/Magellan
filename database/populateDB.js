//
// Populates the database with our JSON recipe data
//

//ADD 'source' column to each - set to homepage of site (here - "Food Network")
//Convert chef names from all caps to normal

//Connect to Mongo
const connection = require('./dbConnect.js').client;

connection.connect((err, db) => {
    if (err) throw err;
    console.log("Connected to Mongo cluster");

    const recipeDB = db.db("recipeData"); //Our main database

    //Create a 'recipes' collection if it does not currently exist
    if (!(recipeDB.listCollections({name: 'recipes'})).hasNext()) {
        recipeDB.createCollection("recipes", (err, res) => {
            if (err) throw err;
            console.log("Collection 'recipes' not found. Creating from scratch");
        });
    }

    //Add FoodNetwork recipes to our collection
    const coll = recipeDB.collection('recipes'); //Jump to our collection

    const jsonData = JSON.parse(require('fs').readFileSync('../scrapers/FoodNetworkRecipeData.json')); //Read in the JSON file
    const recipes = jsonData.data;

    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];

        //Construct an SQL insert string
        /*const URL = recipe.URL;
        const imageURL = recipe.imageURL;
        const author = recipe.author;
        const recipeName = recipe.recipeName;
        const difficulty = recipe.difficulty;
        const totalTime = recipe.totalTime;
        const prepTime = recipe.prepTime;
        const inactiveTime = recipe.inactiveTime;
        const cookTime = recipe.cookTime;
        const yield = recipe.yield;*/

        coll.insertOne(recipe, (err) => {
            if (err) throw err;
            console.log("Inserted recipe with name: " + recipe.recipeName);
        });

        //REGEX TO FIND BAD JSON LABELS: ,"Yield:.*\.":

        //CAN PROBABLY JUST ADD WHOLE OBJECT SINCE IT'S JSON ALREADY ^^

        /*const ings = recipe.ingredients; //Parse ingredient list
        for (const key in ings) { //Go through each list in the recipe
            const list = ings[key];
            for (let j = 0; j < list.length; j++) { //Iterate through each list's ingredients
                console.log(list[j]);
            }
        }*/

        /*coll.insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
        });*/
    }
    db.close();      
});
