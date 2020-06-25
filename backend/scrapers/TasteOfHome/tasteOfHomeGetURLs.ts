//
// Gathers a list of all recipe links from Taste Of Home
//

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

//Main function - runs automatically
(async function getURLs() {
    try {
        //Start Puppeteer using the stealth plugin
        puppeteer.use(StealthPlugin());
        const browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        console.log('- Started Puppeteer');

        //Go to the main page with all recipes
        process.stdout.write('- Navigating to main recipe page ... ');
        const recipePage: string = 'https://www.tasteofhome.com/recipes/';
        await page.goto(recipePage);
        console.log('done');

        //Find the number of total pages
        process.stdout.write('- Determining total number of pages to search ... ');
        const pageNumberPath: string = 'html > body.archive.post-type-archive.post-type-archive-recipe.header-full-width.full-width-content.full-width-toh.archive-page.js.load-white-out > div.site-container > div.site-inner > div.content-sidebar-wrap > div.pagination-wrapper > a.page-numbers:nth-child(4)';
        const pageNumber = await page.$eval(pageNumberPath, btn => btn.innerHTML); //Pull out the inner text
        const numPages = parseInt(pageNumber.replace(/,/g, '')); //Remove the comma and convert to a number
        console.log('done');

        //Create a new file to write our links to
        const recipeFileName: string = 'TasteOfHomeRecipes.txt';
        const writeStream = fs.createWriteStream(recipeFileName);

        //Go through each page of recipe links
        process.stdout.write('- Gathering recipe URLs ...');

        for (let i = 1; i <= numPages; i++) {

            //Determine the url of the next page
            // The url for page 1 does not include a number, so exclude it for that page only
            const pageNum = (i === 1) ? '' : `page/${i}/`;
            const nextPage = recipePage + pageNum;
            await page.goto(nextPage);

            page.waitFor(1000); //Wait a second to appear more human

            //Get a list of all recipe links on this page
            const linkPath: string = 'html > body.archive.post-type-archive.post-type-archive-recipe.header-full-width.full-width-content.full-width-toh.archive-page.js.load-white-out > div.site-container > div.site-inner > div.recipes.tax-grid > ul > li[class=single-recipe] a';
            const urls = await page.$$eval(linkPath, links => links.map(
                link => link.getAttribute('href')
            ));

            //Add the next batch of links to the txt file, and visually track our progress
            urls.map(url => writeStream.write(url + '\n'));
            if (i % Math.ceil(numPages / 7) === 0) process.stdout.write('.');
        }

        browser.close();
        console.log(' done');
        console.log('- All urls saved to ' + recipeFileName);
    }
    catch (err) {
        console.log('Error in getURLs:', err);
    }
})();
