import puppeteer from 'puppeteer';
import fs from 'fs';

//ROTATE IPS AND USER AGENTS - STORE LISTS OF EACH IN RESOURCES???

(async function getURLs() {
    try {
        //Start Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        console.log('- Started Puppeteer');

        //Go to the main page with all recipes
        console.log('- Gathering recipe URLs from Taste of Home')
        const recipePage: string = 'https://www.tasteofhome.com/recipes/';
        await page.goto(recipePage);

        //Find the number of total pages
        const pageNumberPath: string = 'html > body.archive.post-type-archive.post-type-archive-recipe.header-full-width.full-width-content.full-width-toh.archive-page.js.load-white-out > div.site-container > div.site-inner > div.content-sidebar-wrap > div.pagination-wrapper > a.page-numbers:nth-child(4)';
        const pageCount = await page.$eval(pageNumberPath, btn => btn.innerHTML); //Pull out the inner text
        const numPages = parseInt(pageCount.replace(/,/g, '')); //Remove the comma and convert to a number

        //Go through each page of recipe links
        for (let i = 1; i <= 1/*numPages*/; i++) {

            //Determine the url of the next page
            // The url for page 1 does not include a number, so exclude it for that one only
            const pageNum = (i === 1) ? '' : `page/${i}/`;
            const nextPage = recipePage + pageNum;
            await page.goto(nextPage);

            //Get all recipe links on this page
            //FILTER OUT THE ADS, GET ONLY THE HREFS
            const linkPath: string = 'html > body.archive.post-type-archive.post-type-archive-recipe.header-full-width.full-width-content.full-width-toh.archive-page.js.load-white-out > div.site-container > div.site-inner > div.recipes.tax-grid > ul > li.single-recipe > a';
            const urls = await page.$$(linkPath);
            let links: string[] = urls.map(link => link.href);
            console.log(links);
        }

        browser.close();
        console.log(' - Completed - all urls saved to file');
    }
    catch (err) {
        console.log('Error in getURLs:', err);
    }
})();
