const puppeteer = require('puppeteer');

//Main function - calls itself automatically and handles entire process
(async function scrapeSite() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const chefList = await getChefs(page); //Store links to all chef pages

        //Store links to every recipe from every chef
        for (let i = 0; i < chefList.length; i++){ //Explicit for loop to ensure items are handled in the proper order
            //getRecipes(chefList[i]);
            await getRecipes(chefList[i], page);
        }

        //Shut down the browser when finished
        await browser.close();

    } catch(err) {
        console.log("Error in 'scrapeSite()': ", err);
    }
})();

//Gather all recipes from the site and store them in a list
const getChefs = async(page) => {
    try {
        //Get a list of links to every chef
        await page.goto('https://www.foodnetwork.com/profiles/talent');

        //Store the link from each list item in an array
        const chefList = await page.evaluate(() => {
            const links = document.querySelectorAll('.m-PromoList__a-ListItem > a');
            return Array.from(links).map((link) => {return link.href});
        });
        return chefList;

    } catch(err) {
        console.log("Error in 'getChefs': ", err);
    }
};

//Find all recipes from a given chef
const getRecipes = async(chefURL, page) => {
    //const profileBrowser = await puppeteer.launch();
    //const profilePage = await profileBrowser.newPage();
    //await profilePage.goto(chefURL + '/recipes'); //Can't reach this?
    try {
        console.log(chefURL + '/recipes');

    } catch(err) {
        console.log("Error in 'getRecipes': ", err);
    }


    /*let recipeLinks = await page.evaluate(() => {
        const element = '.m-MediaBlock__a-HeadlineText > a';
        const elementLinks = document.querySelectorAll(element);Is
        return Array.from(elementLinks).map((elementLink) => {return elementLink.href});
    });

    console.log(recipeLinks);*/

    //https://www.foodnetwork.com/recipes/aaron-sanchez/aaron-sanchezs-mexican-brownies-recipe-1972919
    //await profileBrowser.close();
}
