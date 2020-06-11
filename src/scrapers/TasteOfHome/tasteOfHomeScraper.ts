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
        page.setDefaultNavigationTimeout(0); //Let navigation take as long as it needs
        console.log('- Started Puppeteer');

        //Create a readstream to go through our txt file
        const recipeFileName: string = 'TasteOfHomeRecipes.txt';
        const readStream = fs.createReadStream(recipeFileName);
        readStream.setEncoding('utf8');

        //Read the data line by line with the readline module
        process.stdout.write('- Reading data from file now ... ');
        const lineReader = readline.createInterface({
            input: readStream
        });

        //Scrape every page and store the data in an array
        let recipes: RecipeData[] = [];
        for await (const line of lineReader) {
            recipes.push(await scrapePage(line, page));
        }

        //const data = JSON.stringify({ data: recipes }, null, 1);
        console.log('done');
    }
    catch (err) {
        console.log('Error in scrapeSite:', err);
    }
})();

//Find the desired data on a page and return it as a RecipeData object
async function scrapePage(url: string, page: Page): Promise<RecipeData> {
    await page.goto(url);

    //List of selectors for each item we want
    const selectors = {
        imageSelector:        'img.-image.initial.loading',
        authorSelector:       '',
        recipeNameSelector:   '',
        difficultySelector:   '',
        totalTimeSelector:    '',
        prepTimeSelector:     '',
        inactiveTimeSelector: '',
        activeTimeSelector:   '',
        cookTimeSelector:     '',
        yieldSelector:        '',
    }

    //Retrieve all of our elements individually
    let imageURL = await getElement(page, selectors.imageSelector, 'src');
    console.log(imageURL);
 
    let test: RecipeData = {
        URL:          url,
        imageURL:     imageURL,
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

//Retrieve the content of a single element based on its class name and the attribute to pull out
async function getElement(page: Page, selector: string, attribute: string): Promise<string> {
    let result;

    //Grab the element if it exists
    //If not, or if it has an empty attribute (i.e. no image src), return an empty string
    try {
        result = await page.$eval(selector,
            (element, attribute) => (element.getAttribute(attribute) ?? ''), attribute
        );
    }
    catch (err) {
        result = '';
    }
    return result;
}
