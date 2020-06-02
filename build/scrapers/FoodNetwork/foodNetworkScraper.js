"use strict";
const puppeteer = require('./puppeteer');
const fs = require('fs');
const rl = require('readline');
//Export scrapeSite as a module (but keep as self-calling)
//oragnize all scrapers into single, callable api
//FINISH CLEANING DATA (recipe name = author name, etc.)
// 
//REWRITE GETDIRECTIONS TO HANDLE YIELD SUBTITLES, THEN RERUN FROM START
//
//Main function - calls itself automatically and handles entire process
(async function scrapeSite() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0); //Let navigation take as long as it needs
        console.log('Initialized browser and page');
        const recipeFileName = 'FoodNetworkRecipes.txt'; //Name of file which stores our recipe ULRs
        const JSONFileName = 'FoodNetworkRecipeData.json'; //Name of file which stores our JSON data
        //Gather all recipes from all chefs
        //await findAllRecipes(page, recipeFileName);
        //Convert the recipes file to a JSON
        await writeRecipesToJSON(page, recipeFileName, JSONFileName);
        console.log("Scraping completed successfully");
        await browser.close();
    }
    catch (err) {
        console.log("Error in 'scrapeSite':", err);
    }
})();
//Gather all recipes from all chefs
async function findAllRecipes(page, fileName) {
    try {
        console.log("Gathering all recipes");
        const stream = fs.createWriteStream(fileName); //Write stream for txt file
        const chefs = await getChefs(page); //List of all chef pages
        //Store links to every recipe from every chef
        for (let i = 0; i < chefs.length; i++) {
            await getRecipes(chefs[i], page, stream); //Grab all the chef's recipes
        }
        console.log("Successfully gathered all recipes");
        stream.end();
    }
    catch (err) {
        console.log("Error in 'findAllRecipes':", err);
    }
}
//Get a list of links to every chef
const getChefs = async (page) => {
    try {
        console.log("Gathering chef list...");
        await page.goto('https://www.foodnetwork.com/profiles/talent'); //Page where all chefs are listed
        //Store the link from each list item in an array
        const chefList = await page.evaluate(() => {
            const links = document.querySelectorAll('.m-PromoList__a-ListItem > a');
            return Array.from(links).map(link => link.href);
        });
        console.log("Chef list complete");
        return chefList;
    }
    catch (err) {
        console.log("Error in 'getChefs':", err);
    }
};
//Find all recipes from a given chef
const getRecipes = async (chefURL, page, filestream) => {
    try {
        console.log("Collecting all recipes for chef", chefURL.slice(44));
        await page.goto(chefURL + '/recipes'); //Page with all the chef's recipes
        //Get the number of pages to evaluate
        let pageCount = 1;
        const pgNumSelector = 'li.o-Pagination__a-ListItem:nth-child(6) > a:nth-child(1)';
        if (await page.$(pgNumSelector) != null) { //If a button to the last page exists, get the number inside it
            pageCount = parseInt(await page.$eval(pgNumSelector, btn => btn.innerText));
        }
        //Go through each page
        for (let i = 1; i <= pageCount; i++) {
            await page.goto(chefURL + '/recipes/trending-/p/' + i); //Move to the next page
            //Store the link to each page's recipes in an array
            const recipes = await page.evaluate(() => {
                const path = '.o-ListRecipe > .l-List > .m-MediaBlock.o-Capsule__m-MediaBlock > .m-MediaBlock__m-TextWrap > .m-MediaBlock__a-Headline > a';
                const links = document.querySelectorAll(path);
                return Array.from(links).map(link => link.href);
            });
            writeArrayToFile(recipes, filestream); //Add this chef's recipes to a txt file
        }
        return Promise.resolve();
    }
    catch (err) {
        console.log("Error in 'getRecipes':", err);
    }
};
//Append the contents of an array to a file with a given name
function writeArrayToFile(array, filestream) {
    try {
        console.log("Appending recipes to text file");
        array.forEach((item) => {
            filestream.write(item + '\n');
        });
    }
    catch (err) {
        console.log("Error in 'writeArrayToFile':", err);
    }
}
//Put the data for each recipe into a JSON file
async function writeRecipesToJSON(page, inFile, outFile) {
    try {
        console.log("Beginning construction of JSON file");
        //Prepare the files to be read/written
        const readStream = fs.createReadStream(inFile);
        const writeStream = fs.createWriteStream(outFile);
        const lineReader = rl.createInterface({
            input: readStream
        });
        //Get the length of the recipe file (I am deeply ashamed of this)
        let len = 0;
        fs.readFileSync(inFile).toString().split("\n").forEach((line, i, arr) => {
            len = arr.length;
            return;
        });
        //Get the data from each url and convert it to JSON
        let i = 0;
        writeStream.write('{\n\t"data" : [\n');
        console.time('Data gathering took'); //Track how long it takes to gather data from all recipes
        for await (const line of lineReader) {
            const data = await getData(line, page);
            const comma = (i < len - 1) ? ',' : ''; //Add a comma if we are not at the end yet
            writeStream.write('\t\t' + data + comma + '\n'); //Write JSON'd data to the file
            i++;
        }
        writeStream.write('\t]\n}');
        console.log("JSON file completed");
        console.timeEnd('Data gathering took');
    }
    catch (err) {
        console.log("Error in 'readRecipesToJSON':", err);
    }
}
//Gather and store all relevant information from a recipe in JSON format
const getData = async (recipeURL, page) => {
    try {
        console.log("Gathering data from url ...", recipeURL.slice(35));
        await page.goto(recipeURL);
        //Selectors for each piece of data
        const selectors = {
            url: recipeURL,
            imageSelector: '.m-MediaBlock__a-Image.a-Image',
            authorSelector: 'div.o-Attribution__m-Author span.o-Attribution__a-Author--Prefix span.o-Attribution__a-Name a',
            recipeNameSelector: '.o-AssetTitle__a-Headline > span:nth-child(1)',
            difficultySelector: 'ul.o-RecipeInfo__m-Level li span.o-RecipeInfo__a-Description',
            totalTimeSelector: 'li span.o-RecipeInfo__a-Description.m-RecipeInfo__a-Description--Total',
            yieldSelector: 'ul.o-RecipeInfo__m-Yield li span.o-RecipeInfo__a-Description',
            ingredientListSelector: 'div.o-Ingredients__m-Body',
            ingredientClass: 'o-Ingredients__a-Ingredient',
            stepListSelector: 'div.o-Method__m-Body',
            stepClass: 'li.o-Method__m-Step'
        };
        //Get all relevant data
        const data = await page.evaluate((selectors) => {
            //Function which returns the inner text of an element if it exists and an empty string if it doesn't
            function getInnerText(selector) {
                return (document.querySelector(selector) || { innerText: '' }).innerText;
            }
            //Function for prep/cook/active/inactive time - based on the description since they all use the same class, have no ids, and can be in any order :/
            //Returns an empty string if the element is not found
            function getTimeText(descriptor) {
                const path = "//span[@class='o-RecipeInfo__a-Headline' and contains(., '" + descriptor + ":')]"; //Xpath based on the description of that time
                return (((document.evaluate(path, document, null, XPathResult.ANY_TYPE, null).iterateNext()) || { innerText: '' }).nextElementSibling || { innerText: '' }).innerText;
            }
            //Get an array of ingredients organized based on the part of the recipe they are included in
            function getIngredients() {
                try {
                    const nodes = document.querySelector(selectors.ingredientListSelector).children; //Get everything in the ingredient section
                    const ingredients = {};
                    const main = [];
                    let i = 0;
                    //Main ingredients before any subsections - given the name "main"
                    while (i < nodes.length && nodes[i].className === selectors.ingredientClass) {
                        main.push(nodes[i++].innerText);
                    }
                    ingredients['main'] = main;
                    //Ingredients within subsections (sauces, spice mixes, etc.) - named based on the subsection title
                    while (i < nodes.length) {
                        let sectionName = nodes[i++].innerText;
                        let sectionData = [];
                        while (i < nodes.length && nodes[i].className === selectors.ingredientClass) {
                            sectionData.push(nodes[i++].innerText);
                        }
                        ingredients[sectionName] = sectionData;
                    }
                    return ingredients;
                }
                catch (err) {
                    console.log("Error in getData > getIngredients: ", err);
                }
            }
            //Get an array of directions organized by subrecipe title
            function getDirections() {
                try {
                    const nodes = document.querySelector(selectors.stepListSelector).children; //Get everything in the ingredient section (DOESNT FACTOR YIELD LABELS)
                    const directions = {};
                    let sectionName = "main";
                    let i = 0;
                    //Go through all sections
                    while (i < nodes.length) {
                        let sectionData = [];
                        //If the section contains a list, grab the data from its members
                        if (nodes[i].tagName === 'OL') {
                            innerNodes = nodes[i++].children;
                            for (let j = 0; j < innerNodes.length; j++) {
                                sectionData.push(innerNodes[j].innerText);
                            }
                            directions[sectionName] = sectionData;
                        }
                        //If the section is a header, use that as the title of the next sublist
                        else {
                            sectionName = nodes[i++].innerText;
                        }
                    }
                    return directions;
                }
                catch (err) {
                    console.log("Error in getData > getDirections: ", err);
                }
            }
            //Organize data into an object
            return {
                URL: selectors.url,
                imageURL: (document.querySelector(selectors.imageSelector) || { src: '' }).src,
                author: getInnerText(selectors.authorSelector).slice(19),
                recipeName: getInnerText(selectors.recipeNameSelector),
                difficulty: getInnerText(selectors.difficultySelector),
                totalTime: getInnerText(selectors.totalTimeSelector),
                prepTime: getTimeText('Prep'),
                inactiveTime: getTimeText('Inactive'),
                activeTime: getTimeText('Active'),
                cookTime: getTimeText('Cook'),
                yield: getInnerText(selectors.yieldSelector),
                ingredients: getIngredients(),
                directions: getDirections()
            };
        }, selectors);
        return JSON.stringify(data); //Return data in a JSON format
    }
    catch (err) {
        console.log("Error in 'getData':", err);
    }
};
