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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const connectDB_1 = __importDefault(require("./connectDB"));
const resources_1 = require("../resources");
//Main function - calls itself automatically and adds our JSON data to the database
(function populateDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Connect to Mongo
            const database = yield connectDB_1.default.connect();
            const recipeDB = database.db('recipeData');
            console.log('- Connected to Mongo cluster - populating recipe database');
            console.time('');
            //Create a recipes collection if it does not currently exist
            const COLL_NAME = 'recipes';
            const collExists = yield recipeDB.listCollections({ name: COLL_NAME }).next();
            if (!collExists) {
                process.stdout.write('  > Recipes collection not found. Creating now ... ');
                yield recipeDB.createCollection(COLL_NAME);
                console.log('done');
            }
            else {
                console.log('  > Found the Recipes collection');
            }
            let recipesColl = recipeDB.collection(COLL_NAME); //Jump to our collection
            console.log('  > Inserting all recipes');
            //Add each set of recipes to our collection
            for (let i = 0; i < resources_1.DATA_FILES.length; i++) {
                const current = resources_1.DATA_FILES[i];
                const path = `${app_root_path_1.default}/${current.filePath}`;
                //Read through the JSON file
                process.stdout.write(`    * Adding recipes from ${current.source} ...`);
                const fileData = fs_1.default.readFileSync(path);
                const jsonData = JSON.parse(fileData.toString());
                const recipes = jsonData.data;
                //Add a 'source' property
                const cleanedRecipes = recipes.map(nextRecipe => {
                    nextRecipe.source = current.source;
                    return nextRecipe;
                });
                //Insert any recipes that don't already exist
                let count = 0;
                yield Promise.all(cleanedRecipes.map((nextRecipe) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        yield recipesColl.updateOne({ $and: [
                                { recipeName: nextRecipe.recipeName },
                                { author: nextRecipe.author }
                            ] }, { $setOnInsert: Object.assign({}, nextRecipe) }, { upsert: true });
                        if ((++count) % Math.ceil((recipes.length / 7)) === 0)
                            process.stdout.write('.'); //Track progress
                    }
                    catch (err) {
                        console.log('Error adding item to database:', err);
                    }
                })));
                console.log(' done');
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
