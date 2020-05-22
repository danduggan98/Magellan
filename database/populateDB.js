//
// Populates the database with our JSON recipe data
//

//Main function - calls itself automatically and adds our JSON data to the database
(async function populateDB() {
    try {
        const fs = require('fs');

        const DATA_FILES = [
            {
                filePath: '../scrapers/FoodNetworkRecipeData.json',
                source: 'Food Network'
            }
        ];

        //Connect to Mongo
        const connection = require('./dbConnect.js').client;
        const database = await connection.connect();
        const recipeDB = database.db("recipeData");

        console.log("- Connected to Mongo cluster - populating recipes database now");
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
        process.stdout.write('  > Creating index collection ... ');
        await recipeDB.createCollection(collName);
        console.log('done');

        coll = recipeDB.collection(collName); //Jump to our collection

        //Add each set of recipes to our collection
        for (let i = 0; i < DATA_FILES.length; i++) {
            const current = DATA_FILES[i];

            process.stdout.write(`  > Adding recipes from ${current.source} ...`);
            const jsonData = JSON.parse(fs.readFileSync(current.filePath)); //Read through the JSON file
            const recipes = jsonData.data;

            const numRecipes = recipes.length;
            for (let j = 0; j < numRecipes; j++) {
                const nextRecipe = recipes[j];
                nextRecipe.author = fixAuthorName(nextRecipe.author); //Fix the author name
                nextRecipe.source = current.source; //Add a 'source' column to note which site this recipe is from

                //Add the recipe to our collection
                //If the recipe already exists, sets the recipe name to itself (no change), and inserts it otherwise
                await coll.updateOne(nextRecipe, {$set: {recipeName: nextRecipe.recipeName} }, {upsert: true});

                if (j % Math.ceil((numRecipes / 7)) === 0) process.stdout.write('.'); //Visual progress indicator
            }
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
