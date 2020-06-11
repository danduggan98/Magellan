//
// Taste of Home Scraper - adds the data from every recipe link to a JSON file
//

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
import readline from 'readline';
import { RecipeData } from 'magellan';
import { Page } from 'puppeteer';

//Main function - runs automatically
(async function scrapeSite() {
    try {
        //Start Puppeteer using the stealth plugin
        puppeteer.use(StealthPlugin());
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        console.log('- Started Puppeteer');

        //Create a readstream to go through our txt file
        const recipeFileName: string = 'TasteOfHomeRecipes.txt';
        const readStream = fs.createReadStream(recipeFileName);
        readStream.setEncoding('utf8');

        //Read the data line by line with the readline module
        process.stdout.write('- Reading data from file now ...');
        const lineReader = readline.createInterface({
            input: readStream
        });

        //Scrape every page and store the data in an array
        let recipes: RecipeData[] = [];
        for await (const line of lineReader) {
            recipes.push(await scrapePage(line, page));
        }

        //const dataToWrite = JSON.stringify({ data: recipes }, null, 1);
    }
    catch (err) {
        console.log('Error in scrapeSite:', err);
    }
})();

//Find the desired data on a page and return it as a RecipeData object
async function scrapePage(url: string, page: Page): Promise<RecipeData> {
    await page.goto(url);
    
    console.log(url ?? '');
 
    let test: RecipeData = {
        URL:          url,
        imageURL:     '',
        author:       '',
        recipeName:   '',
        difficulty:   '',
        totalTime:    '',
        prepTime:     '',
        inactiveTime: '',
        activeTime:   '',
        cookTime:     '',
        yield:        '',
        ingredients:  [],
        directions:   [],
        source:       'Taste of Home'
    };
    return test;
}
