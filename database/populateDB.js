//
// Populates the database with our JSON recipe data
//

//Main function - calls itself automatically and adds our JSON data to the database
(async function populateDB() {
    try {
        const fs = require('fs');
        const root = require('app-root-path') + '/recipeData/';

        const DATA_FILES = [
            {
                filePath: root + 'FoodNetworkRecipeData.json',
                source: 'Food Network'
            }
        ];

        //Connect to Mongo
        const connection = require('./dbConnect.js').client;
        const database = await connection.connect();
        const recipeDB = database.db("recipeData");

        console.log("- Connected to Mongo cluster - populating recipes database");
        console.time('');

        //Rebuild the recipes collection from scratch
        const collName = 'recipes';
        let coll = await recipeDB.listCollections({name: collName}).next();

        //Collection already exists - delete it
        if (coll) {
            process.stdout.write('  > Found recipes collection. Deleting now ... ');
            await recipeDB.dropCollection(collName);
            console.log('done');
        }
        else {
            console.log('  > Recipes collection not found')
        }

        //Add the collection
        process.stdout.write('  > Creating recipes collection ... ');
        await recipeDB.createCollection(collName);
        console.log('done');

        coll = recipeDB.collection(collName); //Jump to our collection
        console.log('  > Inserting all recipes');

        //Add each set of recipes to our collection
        for (let i = 0; i < DATA_FILES.length; i++) {
            const current = DATA_FILES[i];

            process.stdout.write(`    * Adding recipes from ${current.source} ... `);
            const jsonData = JSON.parse(fs.readFileSync(current.filePath)); //Read through the JSON file
            const recipes = jsonData.data;

            //Fix author names and add a 'source' property
            const cleanedRecipes = recipes.map(nextRecipe => {
                nextRecipe.author = fixAuthorName(nextRecipe.author);
                nextRecipe.source = current.source;
                return nextRecipe;
            });

            await coll.insertMany(cleanedRecipes);
            console.log('done');
        }
        database.close();

        process.stdout.write('- Successfully populated database in');
        console.timeEnd('');

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
