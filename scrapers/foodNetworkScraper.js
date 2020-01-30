const puppeteer = require('puppeteer');

//Gather all recipes from the site and store them in a list
async function getRecipes(){

    //Get a list of links to every chef
    const chefIndex = 'https://www.foodnetwork.com/profiles/talent';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(chefIndex);

    let chefList = await page.evaluate(() => {
        const listItem = '.m-PromoList__a-ListItem > a';
        const links = document.querySelectorAll(listItem);
        return Array.from(links).map((link) => {return link.href});
    });

    //Store the urls of every recipe from every chef
    for (chef of chefList){
        getRecipes(chef);
    }
    
    async function getRecipes(chefURL){
        chefURL += '/recipes';
        console.log(chefURL);
    }

    //Shut down the browser on completion
    await browser.close();
}

getRecipes();
