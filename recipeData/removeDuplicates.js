//
//  Removes all duplicate recipes from a recipe data JSON file
//  CHANGE AUTHOR NAME HERE, RENAME TO CLEANDATA.JS
//
//     Notes:
//       - The name of the file is passed in as a command line argument
//       - An arbitrary number of files can be passed and processed
//       - A duplicate is a recipe with the exact same name and author as another recipe
//       - Keeps the duplicates with the most non-null properties, as well as images where possible
//

// Main function - runs automatically
(async function removeDuplicates() {
    try {
        const fs = require('fs');
        const args = process.argv.slice(2); //Grab command line args
    
        //Apply to each file in args
        for (let i = 0; i < args.length; i++) {
            const nextFile = args[i];
            
            const jsonData = JSON.parse(fs.readFileSync(nextFile));
            const recipes = jsonData.data;

            console.log(`\n- Processing "${nextFile}"`);
            process.stdout.write(`  > Cleaning data now ...`);
            console.time('  > Completed successfully in');

            //Go through the file and find the indexes of any duplicates
            for (let j = 0; j < recipes.length; j++) {
                let current = recipes[j];
                let duplicates = [];

                for (let k = j + 1; k < recipes.length; k++) {
                    let next = recipes[k];

                    //Same author and recipe name = duplicate found - add index to list of duplicates
                    if (current.recipeName === next.recipeName && current.author === next.author) {
                        if (!duplicates.length) duplicates.push({ idx: j, score: 0 });
                        duplicates.push({ idx: k, score: 0 });
                    }
                }

                //Duplicates found - determine which one to keep
                if (duplicates.length) {

                    //Count the number of non-null properties other than the imageURL
                    for (let l = 0; l < duplicates.length; l++) {
                        let nextDupe = duplicates[l];
                        let nextDupeData = recipes[nextDupe.idx];

                        for (const key in nextDupeData) {
                            if (nextDupeData[key] && key !== 'imageURL') nextDupe.score++;
                        }
                    }

                    //Sort by score, then by whether an image is present
                    duplicates.sort((a, b) => {
                        if (a.score === b.score) {
                            return !!recipes[b.idx].imageURL - !!recipes[a.idx].imageURL;
                        }
                        return b.score - a.score;
                    });

                    //Remove all duplicates
                    let itemsToRemove = duplicates.slice(1); //Keep the top scoring result

                    for (let m = 0; m < itemsToRemove.length; m++) {
                        recipes.splice(itemsToRemove[m].idx, 1);
                        itemsToRemove = itemsToRemove.map(element => --element.idx); //Decrement each index since the array has shrunk
                    }
                }
                if (j % Math.ceil((recipes.length / 7)) === 0) process.stdout.write('.'); //Visual progress indicator
            }
            console.log(' done');
            
            //Put data into a named array and convert to JSON
            const dataToWrite = JSON.stringify({ data: recipes });

            //Add data to a new file in the same folder as the original
            const newFileName = nextFile.slice(0,-8) + 'Clean.json';
            process.stdout.write(`  > Adding all recipes to file "${newFileName}" ... `);

            fs.writeFile(newFileName, dataToWrite, (err) => {
                if (err) throw err;
                console.log('done');
                console.timeEnd('  > Completed successfully in');
            });
        }
    }
    catch (err) {
        console.log('Error in removeDuplicates:', err);
    }
})();
