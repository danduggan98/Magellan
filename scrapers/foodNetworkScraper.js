const puppeteer = require('puppeteer');

//Main function - calls itself automatically and handles entire process
(async function scrapeSite() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const chefList = await getChefs(page); //All chef pages
        const masterRecipeList = []; //All recipes from the site

        /*
        //Store links to every recipe from every chef
        for (let i = 0; i < chefList.length; i++){ //Explicit for loop to ensure items are handled in the proper order
            await getRecipes(chefList[i], page);
            
        }*/
        const subList = await getRecipes(chefList[2], page)
        masterRecipeList.concat(subList); //Test with my boy Aaron

        //Save the data from every recipe in a json file
        /* const curRecipe
        for (let j = 0; j < masterRecipeList.length; j++){
            curRecipe  = await getData(masterRecipeList[j]);
            //Add all data in list to mongo database
        }
        */

        //Shut down the browser when finished
        await browser.close();

    } catch(err) {
        console.log("Error in 'scrapeSite()': ", err);
    }
})();

//Get a list of links to every chef
const getChefs = async(page) => {
    try {
        await page.goto('https://www.foodnetwork.com/profiles/talent'); //Page where all chefs are listed

        //Store the link from each list item in an array
        const chefList = await page.evaluate(() => {
            const links = document.querySelectorAll('.m-PromoList__a-ListItem > a');
            return Array.from(links).map(link => link.href);
        });
        return chefList;

    } catch(err) {
        console.log("Error in 'getChefs': ", err);
    }
};

//Find all recipes from a given chef (HAVE IT GO THROUGH ALL PAGES)
const getRecipes = async(chefURL, page) => {
    try {
        await page.goto(chefURL + '/recipes'); //Page with all the chef's recipes
        const recipeList = [];

        //GET THE NUMBER OF PAGES OF RECIPES
        const pageCount = 1;
        console.log(pageCount);

        //Go through each page in the results
        //for (let i = 1; i <= pageCount; i++){
            //page.goto(chefURL + 'recipes/trending-/p/' + i); //TEST THIS

            //Store the link to each recipe in an array
            const recipes = await page.evaluate(() => {
                const path = '.o-ListRecipe > .l-List > .m-MediaBlock.o-Capsule__m-MediaBlock > .m-MediaBlock__m-TextWrap > .m-MediaBlock__a-Headline > a';
                const links = document.querySelectorAll(path);
                return Array.from(links).map(link => link.href);
            });
            console.log(recipes);
            recipeList.concat(recipes); //Add the list for this page to our master list
        //}

        console.log(recipeList); //TESTING
        return recipeList;

    } catch(err) {
        console.log("Error in 'getRecipes': ", err);
    }
};

//Gather and store all relevant information from a recipe
const getData = async(recipeURL, page) => {};
