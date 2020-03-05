//
// Populates the database with our JSON recipe data
//

//Main function - calls itself automatically and adds our JSON data to the database
(function populateDB() {
    try {
        //Connect to Mongo
        const connection = require('./dbConnect.js').client;

        connection.connect((err, db) => {
            if (err) throw err;
            console.log("Connected to Mongo cluster");

            const recipeDB = db.db("recipeData"); //Connect to our main database

            //Create a 'recipes' collection if it does not currently exist
            if (!(recipeDB.listCollections({name: 'recipes'})).hasNext()) {
                recipeDB.createCollection("recipes", (err, res) => {
                    if (err) throw err;
                    console.log("Collection 'recipes' not found. Creating from scratch");
                });
            }

            //Add FoodNetwork recipes to our collection
            const coll = recipeDB.collection('recipes'); //Jump to our collection

            const jsonData = JSON.parse(require('fs').readFileSync('../scrapers/FoodNetworkRecipeData.json')); //Read through the JSON file
            const recipes = jsonData.data;

            for (let i = 0; i < recipes.length; i++) {
                const recipe = recipes[i];
                recipe.author = fixAuthorName(recipe.author); //Fix the author name
                recipe.source = "Food Network"; //Add a 'source' column to note which site this recipe is from

                //Add the recipe to our collection
                coll.insertOne(recipe, (err) => {
                    if (err) throw err;
                    console.log("Inserted recipe by " + recipe.author + " with name '" + recipe.recipeName + "'");
                });
            }
        });

    } catch (err) {
        console.log("Error in 'populateDB':", err);
    }
})();

//Convert an author name from all caps to normal
function fixAuthorName(name) {
    let fixedName = name.toString().toLowerCase(); //Make lowercase
    fixedName = fixedName.charAt(0).toUpperCase() + fixedName.slice(1); //Capitalize first letter

    //Capitalize the rest
    for (let i = 0; i < fixedName.length; i++) {
        if (fixedName.charAt(i) === ' ') {
            fixedName = fixedName.slice(0, i+1) + fixedName.charAt(i+1).toUpperCase() + fixedName.slice(i+2);
        }
    }
    return fixedName;
}
