//
// Populates the database with our JSON recipe data
//

import fs from 'fs';
import rootPath from 'app-root-path';
import { CommandCursorResult, Collection } from 'mongodb';
import client from './connectDB';
import { DATA_FILES } from '../resources';
import { RecipeData } from 'magellan';

//Main function - calls itself automatically and adds our JSON data to the database
(async function populateDB() {
    try {
        //Connect to Mongo
        const database = await client.connect();
        const recipeDB = database.db('recipeData');

        console.log('- Connected to Mongo cluster - populating recipe database');
        console.time('');

        //Create a recipes collection if it does not currently exist
        const COLL_NAME: string = 'recipes';
        const collExists: CommandCursorResult = await recipeDB.listCollections({ name: COLL_NAME }).next();

        if (!collExists) {
            process.stdout.write('  > Recipes collection not found. Creating now ... ');
            await recipeDB.createCollection(COLL_NAME);
            console.log('done');
        }
        else {
            console.log('  > Found the Recipes collection');
        }

        let recipesColl: Collection = recipeDB.collection(COLL_NAME); //Jump to our collection
        console.log('  > Inserting all recipes');

        //Add each set of recipes to our collection
        for (let i = 0; i < DATA_FILES.length; i++) {
            const current = DATA_FILES[i];
            const path = `${rootPath}/${current.filePath}`;

            //Read through the JSON file
            process.stdout.write(`    * Adding recipes from ${current.source} ...`);
            const fileData: Buffer = fs.readFileSync(path);
            const jsonData = JSON.parse(fileData.toString());
            const recipes: RecipeData[] = jsonData.data;

            //Add a 'source' property
            const cleanedRecipes = recipes.map(nextRecipe => {
                nextRecipe.source = current.source;
                return nextRecipe;
            });

            //Insert any recipes that don't already exist
            let count = 0;
            await Promise.all(
                cleanedRecipes.map(async nextRecipe => {
                    try {
                        await recipesColl.updateOne(
                            { $and: [
                                { recipeName: nextRecipe.recipeName },
                                { author: nextRecipe.author }
                            ]},
                            { $setOnInsert: { nextRecipe } },
                            { upsert: true }
                        );
                        if ((++count) % Math.ceil((recipes.length / 7)) === 0) process.stdout.write('.'); //Track progress
                    }
                    catch (err) {
                        console.log('Error adding item to database:', err);
                    }
                }
            ));
            console.log(' done');
        }

        database.close();
        process.stdout.write('- Successfully populated database in');
        console.timeEnd('');

    } catch (err) {
        console.log("Error in 'populateDB':", err);
    }
})();
