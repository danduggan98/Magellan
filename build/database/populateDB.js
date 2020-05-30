"use strict";
//
// Populates the database with our JSON recipe data
//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Main function - calls itself automatically and adds our JSON data to the database
(function populateDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const fs = require('fs');
            //import app-root-path from ('app-root-path');
            const root = require('../../app-root-path') + 'src/recipeData/';
            const DATA_FILES = [
                {
                    filePath: root + 'FoodNetwork/FoodNetworkDataClean.json',
                    source: 'Food Network'
                }
            ];
            //Connect to Mongo
            const connection = require('./connectDB.js').client;
            const database = yield connection.connect();
            const recipeDB = database.db("recipeData");
            console.log("- Connected to Mongo cluster - populating recipes database");
            console.time('');
            //Rebuild the recipes collection from scratch
            const collName = 'recipes';
            let coll = yield recipeDB.listCollections({ name: collName }).next();
            //Collection already exists - delete it
            if (coll) {
                process.stdout.write('  > Found recipes collection. Deleting now ... ');
                yield recipeDB.dropCollection(collName);
                console.log('done');
            }
            else {
                console.log('  > Recipes collection not found');
            }
            //Add the collection
            process.stdout.write('  > Creating recipes collection ... ');
            yield recipeDB.createCollection(collName);
            console.log('done');
            coll = recipeDB.collection(collName); //Jump to our collection
            console.log('  > Inserting all recipes');
            //Add each set of recipes to our collection
            for (let i = 0; i < DATA_FILES.length; i++) {
                const current = DATA_FILES[i];
                process.stdout.write(`    * Adding recipes from ${current.source} ... `);
                const jsonData = JSON.parse(fs.readFileSync(current.filePath)); //Read through the JSON file
                const recipes = jsonData.data;
                //Add a 'source' property
                const cleanedRecipes = recipes.map(nextRecipe => {
                    nextRecipe.source = current.source;
                    return nextRecipe;
                });
                yield coll.insertMany(cleanedRecipes);
                console.log('done');
            }
            database.close();
            process.stdout.write('- Successfully populated database in');
            console.timeEnd('');
        }
        catch (err) {
            console.log("Error in 'populateDB':", err);
        }
    });
})();
//# sourceMappingURL=populateDB.js.map