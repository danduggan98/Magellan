"use strict";
//
// Taste of Home Scraper - adds the data from every recipe link to a JSON file
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_extra_1 = __importDefault(require("puppeteer-extra"));
const puppeteer_extra_plugin_stealth_1 = __importDefault(require("puppeteer-extra-plugin-stealth"));
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const resources_1 = require("../../resources");
//Main function - runs automatically
(function scrapeSite() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Start Puppeteer using the stealth plugin
            puppeteer_extra_1.default.use(puppeteer_extra_plugin_stealth_1.default());
            const browser = yield puppeteer_extra_1.default.launch({
                headless: true
            });
            const page = yield browser.newPage();
            page.setDefaultNavigationTimeout(0); //Let navigation take as long as it needs
            console.log('- Started Puppeteer');
            console.time('  > Completed successfully in');
            //Create read/write streams to handle our files
            const inputFileName = 'TasteOfHomeRecipes.txt';
            const readStream = fs_1.default.createReadStream(inputFileName);
            const outputFileName = app_root_path_1.default + '/data/TasteOfHome/TasteOfHomeDataRaw.json';
            const writeStream = fs_1.default.createWriteStream(outputFileName);
            //Read the data line by line
            console.log('- Reading data from file now');
            const lineReader = readline_1.default.createInterface({
                input: readStream
            });
            //Scrape every page and store the data in an array
            let counter = 0;
            writeStream.write('{"data":[\n');
            try {
                for (var lineReader_1 = __asyncValues(lineReader), lineReader_1_1; lineReader_1_1 = yield lineReader_1.next(), !lineReader_1_1.done;) {
                    const line = lineReader_1_1.value;
                    const nextRecipe = yield scrapePage(line, page);
                    const data = JSON.stringify(nextRecipe);
                    if (counter)
                        writeStream.write(',\n');
                    writeStream.write(data);
                    //Display our progress
                    process.stdout.write('\r\x1b[K'); //Hacky way to clear the current line in console
                    process.stdout.write('  > Recipes added so far: ' + (++counter).toString() + ' ');
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (lineReader_1_1 && !lineReader_1_1.done && (_a = lineReader_1.return)) yield _a.call(lineReader_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            writeStream.write(']}');
            console.timeEnd('  > Completed successfully in');
            readStream.close();
            writeStream.close();
            yield browser.close();
        }
        catch (err) {
            console.log('Error in scrapeSite:', err);
        }
    });
})();
//Find the desired data on a page and return it as a RecipeData object
function scrapePage(url, page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.goto(url);
        //List of selectors for each item we want
        const selectors = {
            imageSelector: '.-image.initial.loading',
            authorNoteSelector: '.recipe-tagline__text',
            recipeNameSelector: '.recipe-title',
            timeSelector: '.recipe-time-yield__label-prep',
            yieldSelector: '.recipe-time-yield__label-servings',
            ingredientListSelector: '.recipe-ingredients__list li',
            directionsListSelector: '.recipe-directions__list li'
        };
        //Parse the time data, which comes as a single string that needs to be seperated
        let rawTimes = yield getElementText(page, selectors.timeSelector);
        let times = parseTimes(rawTimes);
        //Find and return everything as a single object
        let pageData = {
            URL: url,
            imageURL: yield getElementByAttribute(page, selectors.imageSelector, 'src'),
            author: parseName(yield getElementText(page, selectors.authorNoteSelector)),
            recipeName: yield getElementText(page, selectors.recipeNameSelector),
            difficulty: '',
            totalTime: times.totalTime,
            prepTime: times.prepTime,
            inactiveTime: times.inactiveTime,
            activeTime: times.activeTime,
            cookTime: times.cookTime,
            yield: yield getElementText(page, selectors.yieldSelector),
            ingredients: seperateIngredientsBySection(yield getAllElements(page, selectors.ingredientListSelector)),
            directions: seperateDirectionsBySection(yield getAllElements(page, selectors.directionsListSelector)),
            source: 'Taste of Home'
        };
        console.log(pageData);
        return pageData;
    });
}
//Retrieve the content of a single element based on its class name and the attribute to pull out
function getElementByAttribute(page, selector, attribute) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        //Grab the element if it exists
        //If not, or if it has an empty attribute (i.e. no image src), return an empty string
        try {
            result = yield page.$eval(selector, (element, attribute) => { var _a; return ((_a = element.getAttribute(attribute)) !== null && _a !== void 0 ? _a : ''); }, attribute);
        }
        catch (err) {
            result = '';
        }
        return result;
    });
}
//Retrieves the inner text of an element based on its class name
function getElementText(page, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let txt;
        //Grab the element's text if it exists, or an empty string if it does not
        try {
            txt = yield page.$eval(selector, element => { var _a; return (_a = element.innerHTML.trim()) !== null && _a !== void 0 ? _a : ''; });
        }
        catch (err) {
            txt = '';
        }
        return txt;
    });
}
//Retrieves the innner html of all elements with a particular class name
function getAllElements(page, selector) {
    return __awaiter(this, void 0, void 0, function* () {
        let elements;
        //Grab all elements, or return an empty array if they don't exist
        try {
            elements = yield page.$$eval(selector, list => list.map(el => { var _a; return (_a = el.innerHTML) !== null && _a !== void 0 ? _a : ''; }));
        }
        catch (err) {
            elements = [];
        }
        return elements;
    });
}
//Pulls the author name out of the descriptive paragraph
// The name is found toward the end, between an emdash (either literal or encoded) and a comma
function parseName(paragraph) {
    const dash = '—';
    const emdash = '&amp;mdash;';
    const dashPos = paragraph.lastIndexOf(dash);
    const emdashPos = paragraph.lastIndexOf(emdash);
    let namePos;
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
function parseTimes(times) {
    var _a, _b;
    let parsedTimes = {
        totalTime: '',
        prepTime: '',
        inactiveTime: '',
        activeTime: '',
        cookTime: ''
    };
    //Modify certain words that we don't want to be counted as keywords
    let data = times
        .replace(/Time/g, '')
        .replace(/Total/g, 'total')
        .replace(/-Cook/g, '-cook')
        .replace(/-Fry/g, '-fry')
        .replace(/-Bake/g, '-bake')
        .replace(/-Grill/g, '-grill');
    //Isolate each item into a seperate string
    // Each valid item starts with a capital letter, so look for those
    let keywords = [];
    let lastKeywordIndex = 0;
    const len = data.length;
    for (let i = 1; i <= len; i++) {
        //Letter is capitalized - grab everything between it and the previous capital letter
        const char = (_a = data[i]) !== null && _a !== void 0 ? _a : '';
        if ((char === char.toUpperCase() && char !== char.toLowerCase()) || i === len) {
            let next = data.slice(lastKeywordIndex, i);
            lastKeywordIndex = i;
            keywords.push(next.trim());
        }
    }
    //Extract and add the prep time, giving the same value to total time if it's present
    const prep = (_b = keywords[0]) !== null && _b !== void 0 ? _b : '';
    const colonIdx = prep.indexOf(':');
    if (colonIdx < 0)
        return parsedTimes; //No colon = nothing to find. Just return the empty strings
    let prepDetails = prep.slice(colonIdx + 2);
    parsedTimes.prepTime = prepDetails;
    if (prep.includes('total')) {
        parsedTimes.totalTime = prepDetails;
    }
    //Extract and add the remaining properties, combining them all into the cook time
    let cookDetails = '';
    for (let j = 1; j < keywords.length; j++) {
        let nextDetails = keywords[j];
        if (j > 1)
            cookDetails += ' | ';
        cookDetails += nextDetails;
    }
    parsedTimes.cookTime = cookDetails;
    return parsedTimes;
}
//Break down the list of ingredients into sections with headers
function seperateIngredientsBySection(ingList) {
    //Format the list to remove ads and extra whitespace
    // Ads are usually included as <div> elements tacked onto actual ingredients
    ingList = ingList.map(ing => {
        let potentialAdIdx = ing.indexOf('<div');
        return (potentialAdIdx >= 0)
            ? ing.slice(0, potentialAdIdx)
            : ing;
    });
    let finalList = [];
    const numIngredients = ingList.length;
    let sectionStartIdx = 0;
    let nextHeader = 'main';
    //Parse the ingredient list, and bundle everything after a header
    // into an array with that header as the first element
    for (let i = 0; i < numIngredients; i++) {
        const nextItem = ingList[i];
        //Headers are always bold, so their inner html has '<b>' tags, which aren't used elsewhere
        // Therefore, we can assume that any item whose html starts with '<b' is a header
        if (nextItem.slice(0, 2) === '<b' || i === numIngredients - 1) {
            let newSection = [];
            //Save this header for use with our next section
            newSection.push(nextHeader);
            nextHeader = nextItem.slice(nextItem.indexOf('>') + 1, nextItem.lastIndexOf('<'));
            //Pull out the current section, remove all HTML tags, and add it to our master list
            let sectionIngs = ingList
                .slice(sectionStartIdx, i)
                .map(ing => resources_1.RemoveHtmlTags(ing));
            sectionStartIdx = ++i;
            sectionIngs.map(ing => newSection.push(ing));
            finalList.push(newSection);
        }
    }
    return finalList;
}
//Place all directions into a 'main' section
function seperateDirectionsBySection(dirList) {
    let finalList = [];
    //Remove all HTML nonsense (especially ads)
    let formattedDirections = dirList.map(dir => resources_1.RemoveHtmlTags(dir));
    //Add the directions to a section with our header
    finalList.push(['main'].concat(formattedDirections));
    return finalList;
}
