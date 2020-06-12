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
        imageSelector:          '.-image.initial.loading',
        authorNoteSelector:     '.recipe-tagline__text',
        recipeNameSelector:     '.recipe-title',
        timeSelector:           '.recipe-time-yield__label-prep',
        yieldSelector:          '.recipe-time-yield__label-servings',
        ingredientSelector:     '.recipe-ingredients__list li',
        directionsListSelector: '.recipe-directions__list li'
    }

    //Parse the time data, which comes as a single string that needs to be seperated
    let times = await getElementText(page, selectors.timeSelector);
    //.......

    //Store the ingredients by section
    let ingredientList: string[] = await page.$$eval(selectors.ingredientSelector,
        list => list.map(el => el.innerHTML)
    );
 
    let pageData: RecipeData = {
        URL:          url,
        imageURL:     await getElementByAttribute(page, selectors.imageSelector, 'src'),
        author:       parseName(await getElementText(page, selectors.authorNoteSelector)),
        recipeName:   await getElementText(page, selectors.recipeNameSelector),
        difficulty:   '', //Never included
        totalTime:    times,
        prepTime:     '',
        inactiveTime: '',
        activeTime:   '',
        cookTime:     '',
        yield:        await getElementText(page, selectors.yieldSelector),
        ingredients:  seperateIngredientsBySection(ingredientList),
        directions:   [],
        source:       'Taste of Home'
    };
    console.log(pageData)
    return pageData;
}

//Retrieve the content of a single element based on its class name and the attribute to pull out
async function getElementByAttribute(page: Page, selector: string, attribute: string): Promise<string> {
    let result: string;

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

//Retrieves the inner text of an element based on its class name
async function getElementText(page: Page, selector: string): Promise<string> {
    let txt: string;

    //Grab the element's text if it exists, or an empty string if it does not
    try {
        txt = await page.$eval(selector,
            element => element.innerHTML.trim() ?? ''
        );
    }
    catch (err) {
        txt = '';
    }
    return txt;
}

//Pulls the author name out of the descriptive paragraph
// The name is found toward the end, between an emdash (either literal or encoded) and a comma
function parseName(paragraph: string): string {
    const dash:   string = '—';
    const emdash: string = '&amp;mdash;';

    const dashPos   = paragraph.lastIndexOf(dash);
    const emdashPos = paragraph.lastIndexOf(emdash);
    let namePos: number;

    //Find the type of dash that exists in the paragraph, or return nothing if there isn't one
    if (dashPos > 0) {
        namePos = dashPos + dash.length;
    }
    else if (emdashPos > 0) {
        namePos = emdashPos + emdash.length;
    }
    else {
        return '';
    }

    //Grab the name, which is between the last dash and either a comma or the end
    const credits = paragraph.slice(namePos);
    const authorEndPos = credits.indexOf(',');
    const authorEnd = (authorEndPos > 0) ? authorEndPos : credits.length;

    return credits.slice(0, authorEnd);
}

//Break down the list of ingredients into sections with headers
function seperateIngredientsBySection(ingList: string[]): string[][] {

    //Format the list to remove ads and extra whitespace
    // Ads are always included as <div> elements tacked onto actual ingredients
    ingList = ingList.map(
        ing => {
            let potentialAdIdx = ing.indexOf('<div');
            return (potentialAdIdx > 0)
                ? ing.slice(0, potentialAdIdx)
                : ing.trim()
            ;
        }
    );

    let finalList: string[][] = [];
    const numIngredients = ingList.length;
    let sectionStartIdx = 0;
    let nextHeader: string = 'main';

    //Parse the ingredient list, and bundle everything after a header
    // into an array with that header as the first element
    for (let i = 0; i < numIngredients; i++) {
        const nextItem = ingList[i];

        //Headers are always bold, so their inner html has '<b>' tags, which aren't used elsewhere
        // Therefore, we can assume that any item whose html starts with '<b' is a header
        if (nextItem.slice(0, 2) === '<b' || i === numIngredients - 1) {
            let newSection: string[] = [];

            //Save this header for use with our next section
            newSection.push(nextHeader);
            nextHeader = nextItem.slice(nextItem.indexOf('>') + 1, nextItem.lastIndexOf('<'));

            //Pull out the current section and add it to our master list
            let sectionIngs = ingList.slice(sectionStartIdx, i);
            sectionStartIdx = ++i;

            sectionIngs.map(
                ing => newSection.push(ing)
            );
            finalList.push(newSection);
        }
    }
    return finalList;
}
