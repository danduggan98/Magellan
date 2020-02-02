const puppeteer = require('puppeteer');

//Main function - calls itself automatically and handles entire process
(async function scrapeSite() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const chefList = await getChefs(page); //Store links to all chef pages

        /*
        //Store links to every recipe from every chef
        for (let i = 0; i < chefList.length; i++){ //Explicit for loop to ensure items are handled in the proper order
            await getRecipes(chefList[i], page);
        }*/ await getRecipes(chefList[2], page); //Test with my boy Aaron

        //Shut down the browser when finished
        await browser.close();

    } catch(err) {
        console.log("Error in 'scrapeSite()': ", err);
    }
})();

//Get a list of links to every chef
const getChefs = async(page) => {
    try {
        //Navigate to the page where all chefs are listed
        await page.goto('https://www.foodnetwork.com/profiles/talent');

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

//Find all recipes from a given chef
const getRecipes = async(chefURL, page) => {
    try {
        //Navigate to the page with all the chef's recipes
        await page.goto(chefURL + '/recipes');

        //Store the link to each recipe in an array
        const recipeList = await page.evaluate(() => {
            const links = document.querySelectorAll('.m-MediaBlock__a-HeadlineText > a');
            return Array.from(links).map(link => link.href);
        });
        
        console.log(recipeList); //TESTING
        return recipeList;

    } catch(err) {
        console.log("Error in 'getRecipes': ", err);
    }
};

//Gather+store all relevant information from a recipe
const getData = async(recipeURL, page) => {};
