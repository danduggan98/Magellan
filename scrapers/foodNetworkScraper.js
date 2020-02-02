const puppeteer = require('puppeteer');

//Main function - runs automatically and handles entire process
(async function scrapeSite() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const chefList = await getChefs(browser, page);
        getRecipes(chefList[2]); //test with Aaron sanchez

        //Store the urls of every recipe from every chef
        /*for (let i = 0; i < chefList.length; i++){
            getRecipes(chefList[i]);
        }
        */

        //Shut down the browser on completion
        await browser.close();

    } catch(err) {
        console.log("Try/Catch failed:", err);
    }
})();

//Gather all recipes from the site and store them in a list
const getChefs = async(browser, page) => {
    
    //Get a list of links to every chef
    await page.goto('https://www.foodnetwork.com/profiles/talent');

    //Store the link from each list item in an array
    const chefList = await page.evaluate(() => {
        const listItem = '.m-PromoList__a-ListItem > a';
        const links = document.querySelectorAll(listItem);
        return Array.from(links).map((link) => {return link.href});
    });
    return chefList;
};

async function getRecipes(chefURL) {
    //const profileBrowser = await puppeteer.launch();
    //const profilePage = await profileBrowser.newPage();
    //await profilePage.goto(chefURL + '/recipes'); //Can't reach this?
    console.log(chefURL + '/recipes');

    /*let recipeLinks = await page.evaluate(() => {
        const element = '.m-MediaBlock__a-HeadlineText > a';
        const elementLinks = document.querySelectorAll(element);Is
        return Array.from(elementLinks).map((elementLink) => {return elementLink.href});
    });

    console.log(recipeLinks);*/

    //https://www.foodnetwork.com/recipes/aaron-sanchez/aaron-sanchezs-mexican-brownies-recipe-1972919
    //await profileBrowser.close();
}
