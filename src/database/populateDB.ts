//
// Populates the database with our JSON recipe data
//

import fs from 'fs';
import client from './connectDB';
import { DATA_FILES } from '../resources';
import { CommandCursorResult, Collection } from 'mongodb';

//Main function - calls itself automatically and adds our JSON data to the database
(async function populateDB() {
    try {
        //Connect to Mongo
        const database = await client.connect();
        const recipeDB = database.db("recipeData");

        console.log("- Connected to Mongo cluster - populating recipes database");
        console.time('');

        //Rebuild the recipes collection from scratch
        const collName: string = 'recipes';
        const collExists: CommandCursorResult = await recipeDB.listCollections({name: collName}).next();

        //Collection already exists - delete it
        if (collExists) {
            process.stdout.write('  > Found recipes collection. Deleting now ... ');
            await recipeDB.dropCollection(collName);
            console.log('done');
        }
        else {
            console.log('  > Recipes collection not found');
        }

        //Add the collection
        process.stdout.write('  > Creating recipes collection ... ');
        await recipeDB.createCollection(collName);
        console.log('done');

        let recipesColl: Collection = recipeDB.collection(collName); //Jump to our collection
        console.log('  > Inserting all recipes');

        //Add each set of recipes to our collection
        for (let i = 0; i < DATA_FILES.length; i++) {
            const current = DATA_FILES[i];

            //Read through the JSON file
            process.stdout.write(`    * Adding recipes from ${current.source} ... `);
            const fileData: Buffer = fs.readFileSync(current.filePath);
            const jsonData = JSON.parse(fileData.toString());
            const recipes: RecipeData[] = jsonData.data;

            //Add a 'source' property
            const cleanedRecipes = recipes.map(nextRecipe => {
                nextRecipe.source = current.source;
                return nextRecipe;
            });

            await recipesColl.insertMany(cleanedRecipes);
            console.log('done');
        }
        database.close();

        process.stdout.write('- Successfully populated database in');
        console.timeEnd('');

    } catch (err) {
        console.log("Error in 'populateDB':", err);
    }
})();
