const puppeteer = require('puppeteer');

async function getChefs(){
    const chefIndex = 'https://www.foodnetwork.com/profiles/talent';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(chefIndex);

    let data = await page.evaluate(() => {
        const itemName = '.m-PromoList__a-ListItem';
        const items = document.querySelectorAll(itemName);
        return Array.from(items).map((item) => {return item.href});
    });

    var chefList = data;
    //chefList.push(url);

    console.log(chefList);
    await browser.close();
}

async function getRecipes(chefURL){}

getChefs();