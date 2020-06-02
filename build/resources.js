"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_FILES = exports.IGNORED_WORDS = exports.VALID_SEPERATORS = void 0;
//List of symbols which are allowed to seperate search terms
const VALID_SEPERATORS = [
    ' ', '-', '/', ',', '+', '&'
];
exports.VALID_SEPERATORS = VALID_SEPERATORS;
//Alphabetical list of words to skip over when indexing the database or parsing search terms
const IGNORED_WORDS = [
    'a', 'about', 'addition', 'additional', 'after', 'all', 'and', 'approximate', 'approximately', 'as', 'at', 'because', 'been', 'before', 'better', 'best', 'big', 'boil', 'boiling',
    'bold', 'bought', 'but', 'buy', 'by', 'can', 'chop', 'chopped', 'clean', 'cleaned', 'cup', 'cups', 'cut', 'dice', 'diced', 'dirty', 'don', 'dry', 'el', 'even', 'evenly', 'ever',
    'every', 'exact', 'exactly', 'f', 'fine', 'finely', 'follow', 'follows', 'for', 'from', 'gallon', 'gallons', 'huge', 'hard', 'i', 'ideal', 'ideally', 'if', 'in', 'inch', 'inches',
    'instead', 'into', 'it', 'just', 'kind', 'la', 'large', 'largest', 'least', 'll', 'liter', 'liters', 'made', 'main', 'median', 'medium', 'mine', 'mix', 'more', 'most', 'my', 'n',
    'need', 'needed', 'necessary', 'not', 'o', 'of', 'on', 'only', 'once', 'or', 'ounce', 'ounces', 'our', 'over', 'perfect', 'perfectly', 'plus', 'prefer', 'preferably', 'quart',
    'quarts', 'recipe', 'recipes', 'recommended', 'remove', 'ripe', 'room', 'round', 's', 'see', 'self', 'since', 'small', 'soon', 'store', 't', 'table', 'tablespoon', 'tablespoons',
    'teach', 'teaspoon', 'teaspoons', 'temperature', 'the', 'their', 'thick', 'to', 'type', 'under', 'until', 'very', 'we', 'wet', 'with', 'when', 'won', 'you', 'your'
];
exports.IGNORED_WORDS = IGNORED_WORDS;
//List of all files
const DATA_FILES = [
    {
        filePath: 'data/FoodNetwork/FoodNetworkDataClean.json',
        source: 'Food Network'
    }
];
exports.DATA_FILES = DATA_FILES;
