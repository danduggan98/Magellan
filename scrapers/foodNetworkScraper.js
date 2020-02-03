const puppeteer = require('puppeteer');
const fs = require('fs');

//CHANGE IT SO EACH SUBLIST IS APPENDED TO THE FILE, RATHER THAN DOING EVERYTHING AT ONCE UPON COMPLETION

//Main function - calls itself automatically and handles entire process
(async function scrapeSite() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0); //Let navigation take as long as it needs

        const chefs = await getChefs(page); //List of all chef pages
        let masterRecipeList = []; //List of all recipes from the site

        //Store links to every recipe from every chef
        for (let i = 0; i < chefs.length; i++){ //Explicit for loop to ensure items are handled in the proper order
            console.log('Starting chef', i);
            const subList = await getRecipes(chefs[i], page); //Grab all the chef's recipes
            console.log("Finished chef", i);
            masterRecipeList = masterRecipeList.concat(subList); //Add the recipes for this chef to a master list
            //Call getData here on the sublist
        }
        console.log("There are ", masterRecipeList, " recipes");
        writeArrayToFile(masterRecipeList, 'recipes.txt'); //Store all recipes in a file called 'recipes.txt'

        //Save the data from every recipe in a json file
        /*const curRecipe = "";
        for (let j = 0; j < masterRecipeList.length; j++){
            fs.writeFile('recipesData.json', masterRecipeList[j], (err) => { if (err) throw err; });
            //curRecipe  = await getData(masterRecipeList[j]);
            //Add all data in list to json file
        }*/
        
        //Shut down the browser when finished
        await browser.close();

    } catch(err) {
        console.log("Error in 'scrapeSite()':", err);
    }
})();

//Get a list of links to every chef
const getChefs = async(page) => {
    console.log("Compiling chef list");
    try {
        await page.goto('https://www.foodnetwork.com/profiles/talent'); //Page where all chefs are listed

        //Store the link from each list item in an array
        const chefList = await page.evaluate(() => {
            const links = document.querySelectorAll('.m-PromoList__a-ListItem > a');
            return Array.from(links).map(link => link.href);
        });
        console.log("Finished chef list");
        return chefList;

    } catch(err) {
        console.log("Error in 'getChefs':", err);
    }
};

//HANDLE PEOPLE WITH ONLY A SINGLE PAGE
//Find all recipes from a given chef
const getRecipes = async(chefURL, page) => {
    try {
        await page.goto(chefURL + '/recipes'); //Page with all the chef's recipes

        //Get the number of pages to evaluate
        console.log("Getting page number");

        let pageCount = 1;
        const pgNumSelector = 'li.o-Pagination__a-ListItem:nth-child(6) > a:nth-child(1)';

        if (await page.$(pgNumSelector) != null){ //If a button to the last page exists, get the number inside it
            pageCount = parseInt(await page.$eval(pgNumSelector, btn => btn.innerText));
        }

        //Go through each page
        let recipeList = [];
        for (let i = 1; i <= pageCount; i++){
            await page.goto(chefURL + '/recipes/trending-/p/' + i); //Move to the next page
            console.log('Navigated to:', chefURL + '/recipes/trending-/p/' + i);

            //Store the link to each page's recipes in an array
            const recipes = await page.evaluate(() => {
                const path = '.o-ListRecipe > .l-List > .m-MediaBlock.o-Capsule__m-MediaBlock > .m-MediaBlock__m-TextWrap > .m-MediaBlock__a-Headline > a';
                const links = document.querySelectorAll(path);
                return Array.from(links).map(link => link.href);
            });
            recipeList = recipeList.concat(recipes); //Add the list for this page to our master list
        }
        return recipeList;

    } catch(err) {
        console.log("Error in 'getRecipes':", err);
    }
};

//Gather and store all relevant information from a recipe
const getData = async(recipeURL, page) => {};

function writeArrayToFile(array, fileName) {
    try {
        const file = fs.createWriteStream(fileName);
        array.forEach((item) => { 
            file.write(item + '\n'); 
        });
        file.end();
    } catch (err) {
        console.log("Error in 'writeArrayToFile':", err);
    }
}
