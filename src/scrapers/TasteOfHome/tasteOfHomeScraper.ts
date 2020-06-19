//
// Taste of Home Scraper - adds the data from every recipe link to a JSON file
//

import puppeteer from 'puppeteer-extra';
import { Page } from 'puppeteer';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';
import readline from 'readline';
import rootPath from 'app-root-path';
import { RecipeData, TimeData } from 'magellan';
import { RemoveHtmlTags } from './../../resources';

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
        console.time('  > Completed successfully in');

        //Create read/write streams to handle our files
        const inputFileName: string = 'TasteOfHomeRecipes.txt';
        const readStream = fs.createReadStream(inputFileName);
        
        const outputFileName: string = rootPath + '/data/TasteOfHome/TasteOfHomeDataRaw.json';
        const writeStream = fs.createWriteStream(outputFileName);

        //Read the data line by line
        console.log('- Reading data from file now');
        const lineReader = readline.createInterface({
            input: readStream
        });

        //Scrape every page and store the data in an array
        let counter = 0;

        writeStream.write('{"data":[\n');
        for await (const line of lineReader) {
            const nextRecipe = await scrapePage(line, page);
            const data = JSON.stringify(nextRecipe);

            if (counter) writeStream.write(',\n');
            writeStream.write(data);

            //Display our progress
            process.stdout.write('\r\x1b[K'); //Hacky way to clear the current line in console
            process.stdout.write('  > Recipes added so far: ' + (++counter).toString() + ' ');
        }
        writeStream.write(']}');
        console.timeEnd('  > Completed successfully in');

        readStream.close();
        writeStream.close();
        await browser.close();
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
        ingredientListSelector: '.recipe-ingredients__list li',
        directionsListSelector: '.recipe-directions__list li'
    }

    //Parse the time data, which comes as a single string that needs to be seperated
    let rawTimes = await getElementText(page, selectors.timeSelector);
    let times = parseTimes(rawTimes);

    //Find and return everything as a single object
    let pageData: RecipeData = {
        URL:          url,
        imageURL:     await getElementByAttribute(page, selectors.imageSelector, 'src'),
        author:       parseName(await getElementText(page, selectors.authorNoteSelector)),
        recipeName:   await getElementText(page, selectors.recipeNameSelector),
        difficulty:   '', //Never included
        totalTime:    times.totalTime,
        prepTime:     times.prepTime,
        inactiveTime: times.inactiveTime,
        activeTime:   times.activeTime,
        cookTime:     times.cookTime,
        yield:        await getElementText(page, selectors.yieldSelector),
        ingredients:  seperateIngredientsBySection(await getAllElements(page, selectors.ingredientListSelector)),
        directions:   seperateDirectionsBySection(await getAllElements(page, selectors.directionsListSelector)),
        source:       'Taste of Home'
    };
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

//Retrieves the innner html of all elements with a particular class name
async function getAllElements(page: Page, selector: string): Promise<string[]> {
    let elements: string[];

    //Grab all elements, or return an empty array if they don't exist
    try {
        elements = await page.$$eval(selector,
            list => list.map(
                el => el.innerHTML ?? ''
            )
        );
    }
    catch (err) {
        elements = [];
    }
    return elements;
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
    if (dashPos >= 0) {
        namePos = dashPos + dash.length;
    }
    else if (emdashPos >= 0) {
        namePos = emdashPos + emdash.length;
    }
    else {
        return '';
    }

    //Grab the name, which is between the last dash and either a comma or the end
    const credits = paragraph.slice(namePos);
    const authorEndPos = credits.indexOf(',');
    const authorEnd = (authorEndPos >= 0) ? authorEndPos : credits.length;

    return credits.slice(0, authorEnd);
}

//Pull each time out of the single time string
function parseTimes(times: string): TimeData {
    let parsedTimes: TimeData = {
        totalTime:    '',
        prepTime:     '',
        inactiveTime: '',
        activeTime:   '',
        cookTime:     ''
    };

    //Modify certain words that we don't want to be counted as keywords
    let data = times
        .replace(/Time/g, '')
        .replace(/Total/g, 'total')
        .replace(/-Cook/g, '-cook')
        .replace(/-Fry/g, '-fry')
        .replace(/-Bake/g, '-bake')
        .replace(/-Grill/g, '-grill')
    ;

    //Isolate each item into a seperate string
    // Each valid item starts with a capital letter, so look for those
    let keywords: string[] = [];
    let lastKeywordIndex = 0;
    const len = data.length;

    for (let i = 1; i <= len; i++) {
        //Letter is capitalized - grab everything between it and the previous capital letter
        const char = data[i] ?? '';
        if ((char === char.toUpperCase() && char !== char.toLowerCase()) || i === len) {
            let next = data.slice(lastKeywordIndex, i);
            lastKeywordIndex = i;
            keywords.push(next.trim());
        }
    }

    //Extract and add the prep time, giving the same value to total time if it's present
    const prep = keywords[0] ?? '';
    const colonIdx = prep.indexOf(':');
    if (colonIdx < 0) return parsedTimes; //No colon = nothing to find. Just return the empty strings

    let prepDetails = prep.slice(colonIdx + 2);
    parsedTimes.prepTime = prepDetails;
    if (prep.includes('total')) {
        parsedTimes.totalTime = prepDetails;
    }

    //Extract and add the remaining properties, combining them all into the cook time
    let cookDetails = '';
    for (let j = 1; j < keywords.length; j++) {
        let nextDetails = keywords[j];
        if (j > 1) cookDetails += ' | ';
        cookDetails += nextDetails;
    }
    parsedTimes.cookTime = cookDetails;

    return parsedTimes;
}

//Break down the list of ingredients into sections with headers
function seperateIngredientsBySection(ingList: string[]): string[][] {

    //Format the list to remove ads and extra whitespace
    // Ads are usually included as <div> elements tacked onto actual ingredients
    ingList = ingList.map(
        ing => {
            let potentialAdIdx = ing.indexOf('<div');
            return (potentialAdIdx >= 0)
                ? ing.slice(0, potentialAdIdx)
                : ing
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

            //Pull out the current section, remove all HTML tags, and add it to our master list
            let sectionIngs = ingList
                .slice(sectionStartIdx, i)
                .map(ing => RemoveHtmlTags(ing))
            ;
            sectionStartIdx = ++i;

            sectionIngs.map(
                ing => newSection.push(ing)
            );
            finalList.push(newSection);
        }
    }
    return finalList;
}

//Place all directions into a 'main' section
function seperateDirectionsBySection(dirList: string[]): string[][] {
    let finalList: string[][] = [];

    //Remove all HTML nonsense (especially ads)
    let formattedDirections = dirList.map(
        dir => RemoveHtmlTags(dir)
    );

    //Add the directions to a section with our header
    finalList.push(
        ['main'].concat(formattedDirections)
    );
    return finalList;
}
