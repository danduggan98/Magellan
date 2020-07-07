//
// Useful constants and file names for use around the app
//

import { RecipeDataFile } from 'magellan';

//Regex containing all symbols
const SYMBOL_LIST: RegExp = /[~`!@#$%^&*()-_+={[}\]|\\:;'"<,>.?\/1234567890]+/g;

//List of all characters that can be used to seperate words in search inputs or recipe names
const VALID_SEPERATORS: string[] = [
    ' ', ',', '-'
];

//Alphabetical list of words to skip over when indexing the database or parsing search terms
const IGNORED_WORDS: string[] = [
    'a', 'about', 'addition', 'additional', 'after', 'all', 'and', 'approximate', 'approximately', 'as', 'at', 'because', 'been', 'before', 'better', 'best', 'big', 'boil','boiling',
    'bold', 'bought', 'but', 'buy', 'by', 'can', 'chop', 'chopped', 'clean', 'cleaned', 'cup', 'cups', 'cut', 'daddy', 'dice', 'diced', 'dirty', 'don', 'downtown', 'dry', 'each', 'egga', 'el',
    'em', 'equipment', 'even', 'evenly', 'ever', 'every', 'exact', 'exactly', 'f', 'fine', 'finely', 'follow', 'follows', 'for', 'from', 'gallon', 'gallons', 'goin', 'huge', 'hard', 'i', 'ideal',
    'ideally', 'if', 'in', 'inch', 'inches','instead', 'into', 'it', 'just', 'josh', 'kind', 'la', 'large', 'largest', 'least', 'll', 'liter', 'liters', 'made', 'main', 'mama', 'median', 'medium',
    'mine', 'mix', 'mo', 'more', 'most', 'my', 'n','need', 'needed', 'necessary', 'not', 'o', 'of', 'on', 'only', 'once', 'or', 'ounce', 'ounces', 'our', 'over', 'perfect', 'perfectly', 'plus',
    'pos', 'prefer','preferably', 'quart','quarts', 'recipe', 'recipes', 'recommended', 'remove', 'ripe', 'room', 'round', 's', 'sealable', 'see', 'self', 'serving', 'servings', 'shandy', 'since',
    'small', 'sock', 'soon', 'store', 't', 'table', 'tablespoon', 'tablespoons','teach', 'teaspoon', 'teaspoons', 'temperature', 'the', 'their', 'thick', 'to', 'type', 'under', 'until', 'very',
    'we', 'wet', 'with', 'when', 'won', 'you', 'your'
];

//List of all files
const DATA_FILES: RecipeDataFile[] = [
    {
        filePath: 'data/FoodNetwork/FoodNetworkDataClean.json',
        source:   'Food Network'
    }/*,
    {
        filePath: 'data/TasteOfHome/TasteOfHomeDataClean.json',
        source:   'Taste of Home'
    }*/
];

//Used to find any HTML which might appear in a string
const HTML_TAG_REGEX = /<div.*?>|<\/div>|<a.*?>|<\/a>|<img.*?>|<\/img>|<b.*?>|<\/b>|<p.*?>|<\/p>|<i.*?>|<\/i>|<span.*?>|<\/span>/g;

//Method to remove HTML content and whitespace from a string
const RemoveHtmlTags = (str: string): string => {
    return str.replace(HTML_TAG_REGEX, '').trim();
}

//Sorts an object array by any list of properties, in order
const SortByProperties = (values: any[], properties: string[]): void => {
    for (let i = properties.length - 1; i >= 0; i--) {
        let nextProp = properties[i];

        values.sort((a, b) => {
            return b[nextProp] - a[nextProp];
        })
    }
}

//Parses and isolates each word in a given string
// Calls an externally defined callback function on each parsed word
const ParseTerms = (source: string, callback: (word: string, idx: number) => void): void => {
    let lastWordIndex = 0;
    let wordIdx = 0;

    for (let i = 0; i <= source.length; i++) {
        if (VALID_SEPERATORS.includes(source.charAt(i)) || i === source.length) {
            wordIdx++;
    
            //Isolate each word and clean it by removing all symbols, numbers, and trailing whitespace
            let nextWord = source.slice(lastWordIndex, i);
            let nextWordClean = nextWord
                .trim()
                .replace(SYMBOL_LIST, '')
            ;
            lastWordIndex = ++i;
            callback(nextWordClean, wordIdx);
        }
    }
}

//Convert character encodings to their actual character equivalents
function FixCharacterEncodings(data: string): string {
    let text = data
        .replace(/&amp;/g,  '&')
        .replace(/&lt;/g,   '<')
        .replace(/&gt;/g,   '>')
        .replace(/&quot;/g, `"`)
        .replace(/&apos;/g, `'`)
    ;
    return text;
}

export {
    SYMBOL_LIST,
    VALID_SEPERATORS,
    IGNORED_WORDS,
    DATA_FILES,
    RemoveHtmlTags,
    ParseTerms,
    SortByProperties,
    FixCharacterEncodings
};
