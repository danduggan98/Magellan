const puppeteer = require('puppeteer');

//Gather all recipes from the site and store them in a list
async function scrapeSite(){

    //Get a list of links to every chef
    const chefIndex = 'https://www.foodnetwork.com/profiles/talent';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(chefIndex);

    const chefList = await page.evaluate(() => {
        const listItem = '.m-PromoList__a-ListItem > a';
        const links = document.querySelectorAll(listItem);
        return Array.from(links).map((link) => {return link.href});
    });

    //Store the urls of every recipe from every chef
    /*for (chef of chefList){
        getRecipes(chef);
    }
    */

    getRecipes(chefList[2]); //test with Aaron sanchez
    
    async function getRecipes(chefURL){
        const profileBrowser = await puppeteer.launch();
        const profilePage = await profileBrowser.newPage();
        await profilePage.goto(chefURL + '/recipes'); //Can't reach this?
        console.log(chefURL + '/recipes');

        /*let recipeLinks = await page.evaluate(() => {
            const element = '.m-MediaBlock__a-HeadlineText > a';
            const elementLinks = document.querySelectorAll(element);Is
            return Array.from(elementLinks).map((elementLink) => {return elementLink.href});
        });

        console.log(recipeLinks);*/

        //https://www.foodnetwork.com/recipes/aaron-sanchez/aaron-sanchezs-mexican-brownies-recipe-1972919
        await profileBrowser.close();
    }

    //Shut down the browser on completion
    await browser.close();
}

scrapeSite();
