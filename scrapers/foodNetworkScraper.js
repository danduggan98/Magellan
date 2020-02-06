const puppeteer = require('puppeteer');
const fs = require('fs');
const rl = require('readline');

//Export scrapeSite as a module (but keep as self-calling)
//FINISH DATA GRABBING
//GRAB DATA BY CLASS RATHER THAN SELECTOR for things which can be in different places

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

    } catch (err) {
        console.log("Error in 'scrapeSite':", err);
    }
})();

//Gather all recipes from all chefs
async function findAllRecipes(page, fileName){
    try {
        console.log("Gathering all recipes");
        const stream = fs.createWriteStream(fileName); //Write stream for txt file
        const chefs = await getChefs(page); //List of all chef pages

        //Store links to every recipe from every chef
        for (let i = 0; i < chefs.length; i++){
            await getRecipes(chefs[i], page, stream); //Grab all the chef's recipes
        }
        console.log("Successfully gathered all recipes");
        stream.end();

    } catch (err) {
        console.log("Error in 'findAllRecipes':", err);
    }
}

//Get a list of links to every chef
const getChefs = async(page) => {
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

    } catch (err) {
        console.log("Error in 'getChefs':", err);
    }
};

//Find all recipes from a given chef
const getRecipes = async(chefURL, page, filestream) => {
    try {
        console.log("Collecting all recipes for chef", chefURL.slice(44));
        await page.goto(chefURL + '/recipes'); //Page with all the chef's recipes

        //Get the number of pages to evaluate
        let pageCount = 1;
        const pgNumSelector = 'li.o-Pagination__a-ListItem:nth-child(6) > a:nth-child(1)';

        if (await page.$(pgNumSelector) != null){ //If a button to the last page exists, get the number inside it
            pageCount = parseInt(await page.$eval(pgNumSelector, btn => btn.innerText));
        }

        //Go through each page
        for (let i = 1; i <= pageCount; i++){
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

    } catch (err) {
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
    } catch (err) {
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
        
        const lineReader = rl.createInterface({ //Allows us to scan through the file line by line
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
        for await (const line of lineReader) {
            const data = await getData(line, page);
            const comma = (i < len-1) ? ',' : ''; //Add a comma if we are not at the end yet
            writeStream.write('\t\t' + data + comma + '\n'); //Write JSON'd data to the file
            i++;
        }
        writeStream.write('\t]\n}');
        console.log("JSON file completed");

    } catch (err) {
        console.log("Error in 'readRecipesToJSON':", err);
    }
}

//Gather and store all relevant information from a recipe in JSON format
const getData = async(recipeURL, page) => {
    try {
        console.log("Gathering data from url ...", recipeURL.slice(35));
        await page.goto(recipeURL);

        //Selectors for each piece of data
        const selectors = {
            url: recipeURL,
            recipeNameSelector: '.o-AssetTitle__a-Headline > span:nth-child(1)', 
            totalTimeSelector: '.o-RecipeInfo span > o-RecipeInfo__a-Description m-RecipeInfo__a-Description--Total', //INCORRECT
            //totalTimeSelector: 'div.o-RecipeInfo:nth-child(2) > ul:nth-child(1) > li:nth-child(2) > span:nth-child(2)'
        };

        //Get all relevant data
        const data = await page.evaluate((selectors) => {
            return {
                url : selectors.url,
                recipeName: document.querySelector(selectors.recipeNameSelector).innerText,
                totalTime: document.querySelector(selectors.totalTimeSelector).innerText
                //author: ''
                //, etc...
            };
        }, selectors);
        return JSON.stringify(data); //Return data in a JSON format

    } catch (err) {
        console.log("Error in 'getData':", err);
    }
};
