import puppeteer from 'puppeteer';
import fs from 'fs';

(async function getURLs() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0); //Let navigation take as long as it needs
        console.log('Initialized browser and page');
    }
    catch (err) {
        console.log('Errorr in getURLs:', err);
    }
})();
