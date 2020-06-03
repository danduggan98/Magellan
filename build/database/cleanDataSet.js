"use strict";
//
//  Removes all duplicates and properly formats author names in a recipe data JSON file
//
//     Notes:
//       - The name of the file is passed in as a command line argument
//       - An arbitrary number of files can be passed and processed
//       - A duplicate is a recipe with the exact same name and author as another recipe
//       - Keeps the duplicates with the most non-null properties, and favors those with images
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
const fs_1 = __importDefault(require("fs"));
const app_root_path_1 = __importDefault(require("app-root-path"));
// Main function - runs automatically
(function removeDuplicates() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const args = process.argv.slice(2); //Grab command line args
            //Apply to each file in args
            for (let i = 0; i < args.length; i++) {
                const nextFile = args[i];
                const folderName = nextFile.slice(0, nextFile.indexOf('DataRaw.json'));
                const nextFilePath = `${app_root_path_1.default}/data/${folderName}/${nextFile}`;
                let numRemoved = 0;
                const fileData = fs_1.default.readFileSync(nextFilePath);
                const jsonData = JSON.parse(fileData.toString());
                let recipes = jsonData.data;
                console.log(`\n- Processing "${nextFile}"`);
                process.stdout.write(`  > Cleaning data now ...`);
                console.time('  > Completed successfully in');
                //Properly format the authors
                recipes = recipes.map(element => {
                    element.author = fixAuthorName(element.author);
                    return element;
                });
                //Go through the file and find the indexes of any duplicates
                for (let j = 0; j < recipes.length; j++) {
                    let current = recipes[j];
                    let duplicates = [];
                    for (let k = 0; k < recipes.length; k++) {
                        let next = recipes[k];
                        //Same author and recipe name = duplicate found - add index to list of duplicates
                        if (current.recipeName === next.recipeName && current.author === next.author) {
                            let dupe = { idx: k, score: 0 };
                            duplicates.push(dupe);
                        }
                    }
                    //Duplicates found - determine which one to keep
                    if (duplicates.length > 1) {
                        //Count the number of non-null properties other than the imageURL
                        for (let l = 0; l < duplicates.length; l++) {
                            let nextDupe = duplicates[l];
                            let nextDupeData = recipes[nextDupe.idx];
                            for (const key in nextDupeData) {
                                if (nextDupeData[key] && key !== 'imageURL')
                                    nextDupe.score++;
                            }
                        }
                        //Sort by score, then by whether an image is present
                        duplicates.sort((a, b) => {
                            if (a.score === b.score) {
                                return Number(!!recipes[b.idx].imageURL) - Number(!!recipes[a.idx].imageURL);
                            }
                            return b.score - a.score;
                        });
                        //Remove all duplicates
                        duplicates.shift(); //Remove the top scoring (first) result
                        for (let m = 0; m < duplicates.length; m++) {
                            let curIdx = duplicates[m].idx;
                            recipes.splice(curIdx, 1);
                            numRemoved++;
                            j--; //Array has shifted - jump back so that the next iteration will find the item that followed the deleted one. Otherwise, some are skipped.
                            //After shrinking the array, decrement the index of each recipe which would have shifted down
                            for (let n = m + 1; n < duplicates.length; n++) {
                                let nxt = duplicates[n];
                                if (nxt.idx > curIdx)
                                    nxt.idx--;
                            }
                        }
                    }
                    if (j % Math.ceil(recipes.length / 7) === 0)
                        process.stdout.write('.'); //Visual progress indicator
                }
                console.log(' done');
                //Put data into a named array and convert to formatted JSON
                const dataToWrite = JSON.stringify({ data: recipes }, null, 1);
                //Add data to a new file in the same folder as the original
                const newFileName = nextFile.slice(0, -8) + 'Clean.json';
                const newFilePath = `${app_root_path_1.default}/data/${folderName}/${newFileName}`;
                process.stdout.write(`  > Adding all recipes to file "${newFilePath}" ... `);
                fs_1.default.writeFile(newFilePath, dataToWrite, (err) => {
                    if (err)
                        throw err;
                    console.log('done');
                    numRemoved
                        ? console.log(`  > Deleted ${numRemoved} duplicate recipes`)
                        : console.log('  > Nothing removed - data is already clean');
                    console.timeEnd('  > Completed successfully in');
                });
            }
        }
        catch (err) {
            console.log('Error in removeDuplicates:', err);
        }
    });
})();
//Convert an author name from all caps to normal
function fixAuthorName(name) {
    let fixedName = name.toString().toLowerCase(); //Make lowercase
    fixedName = fixedName.charAt(0).toUpperCase() + fixedName.slice(1); //Capitalize first letter
    //Capitalize the rest
    for (let i = 0; i < fixedName.length; i++) {
        if (fixedName.charAt(i) === ' ') {
            fixedName = fixedName.slice(0, i + 1) + fixedName.charAt(i + 1).toUpperCase() + fixedName.slice(i + 2);
        }
    }
    return fixedName;
}
