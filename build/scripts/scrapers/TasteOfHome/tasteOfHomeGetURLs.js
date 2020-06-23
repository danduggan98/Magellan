"use strict";
//
// Gathers a list of all recipe links from Taste Of Home
//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const fs_1 = __importDefault(require("fs"));
//Main function - runs automatically
(function getURLs() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Start Puppeteer using the stealth plugin
            puppeteer_extra_1.default.use(puppeteer_extra_plugin_stealth_1.default());
            const browser = yield puppeteer_extra_1.default.launch({
                headless: true
            });
            const page = yield browser.newPage();
            console.log('- Started Puppeteer');
            //Go to the main page with all recipes
            process.stdout.write('- Navigating to main recipe page ... ');
            const recipePage = 'https://www.tasteofhome.com/recipes/';
            yield page.goto(recipePage);
            console.log('done');
            //Find the number of total pages
            process.stdout.write('- Determining total number of pages to search ... ');
            const pageNumberPath = 'html > body.archive.post-type-archive.post-type-archive-recipe.header-full-width.full-width-content.full-width-toh.archive-page.js.load-white-out > div.site-container > div.site-inner > div.content-sidebar-wrap > div.pagination-wrapper > a.page-numbers:nth-child(4)';
            const pageNumber = yield page.$eval(pageNumberPath, btn => btn.innerHTML); //Pull out the inner text
            const numPages = parseInt(pageNumber.replace(/,/g, '')); //Remove the comma and convert to a number
            console.log('done');
            //Create a new file to write our links to
            const recipeFileName = 'TasteOfHomeRecipes.txt';
            const writeStream = fs_1.default.createWriteStream(recipeFileName);
            //Go through each page of recipe links
            process.stdout.write('- Gathering recipe URLs ...');
            for (let i = 1; i <= numPages; i++) {
                //Determine the url of the next page
                // The url for page 1 does not include a number, so exclude it for that page only
                const pageNum = (i === 1) ? '' : `page/${i}/`;
                const nextPage = recipePage + pageNum;
                yield page.goto(nextPage);
                page.waitFor(1000); //Wait a second to appear more human
                //Get a list of all recipe links on this page
                const linkPath = 'html > body.archive.post-type-archive.post-type-archive-recipe.header-full-width.full-width-content.full-width-toh.archive-page.js.load-white-out > div.site-container > div.site-inner > div.recipes.tax-grid > ul > li[class=single-recipe] a';
                const urls = yield page.$$eval(linkPath, links => links.map(link => link.getAttribute('href')));
                //Add the next batch of links to the txt file, and visually track our progress
                urls.map(url => writeStream.write(url + '\n'));
                if (i % Math.ceil(numPages / 7) === 0)
                    process.stdout.write('.');
            }
            browser.close();
            console.log(' done');
            console.log('- All urls saved to ' + recipeFileName);
        }
        catch (err) {
            console.log('Error in getURLs:', err);
        }
    });
})();
