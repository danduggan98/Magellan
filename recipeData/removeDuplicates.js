//
// Removes all duplicate recipes from a recipe data JSON file
//
//     Notes:
//       - The name of the file is passed in as a command line argument
//       - An arbitrary number of files can be passed and processed
//       - When choosing which duplicate to keep, it opts for the one with the most information, or flips a coin for ties
//

// Main function - runs automatically
(async function removeDuplicates() {
    try {
        const fs = require('fs');
        const args = process.argv.slice(2);
    
        //Apply to each file in args
        for (let i = 0; i < args.length; i++) {
            const nextFile = args[i];
            const jsonData = JSON.parse(fs.readFileSync(nextFile));
            const recipes = jsonData.data;

            //Go through the file and find the indexes of each duplicate, if any exist
            for (let j = 0; j < recipes.length; j++) {
                let current = recipes[j];
                let duplicates = [];

                for (let k = j + 1; k < recipes.length; k++) {
                    let next = recipes[k];

                    //Same author and recipe name = duplicate found - add index to list of duplicates
                    if (current.recipeName === next.recipeName && current.author === next.author) {
                        if (!duplicates.length) duplicates.push(j);
                        duplicates.push(k)

                        console.log('DUPE - item', k+3, 'matches item', j+3);
                    }
                }

                if (duplicates.length) {
                    console.log('Duplicates:', duplicates.map(idx => idx + 3))

                    //Determine which one to keep
                    let finalChoice;
                    let candidates = [];
                    let maxScore = 0;

                    //Step 1 - Count the number of non-null properties other than the imageURL, and track the max score
                    for (let l = 0; l < duplicates.length; l++) {
                        let score = 0;
                        let nextDupe = recipes[duplicates[l]];

                        for (const key in nextDupe) {
                            if (nextDupe[key] && key !== 'imageURL') score++;
                        }

                        if (score >= maxScore) {
                            maxScore = score; //Update the max
                            candidates.push(duplicates[l]);
                        }
                    }
                    console.log('MAX SCORE:', maxScore);

                    //Step 2 - Find all items with the max score
                    console.log('Duplicates:', duplicates.map(idx => idx + 3))

                    finalChoice = candidates.sort((a, b) => { //Sort them based on whether the imageURL is present
                        return !!recipes[b].imageURL - !!recipes[a].imageURL;
                    })[0];
                    console.log('Candidates:', candidates.map(idx => idx + 3))
                    console.log('Final choice: ', finalChoice + 3)

                    for (let z = 0; z < duplicates.length; z++) {
                        if (duplicates[z] === Number(finalChoice)) {
                            duplicates.splice(z, 1);
                        }
                    }
                    console.log('Remaining duplicates:', duplicates.map(idx => idx + 3), '\n');
                }
            }
        }
    }
    catch (err) {
        console.log('Error in removeDuplicates:', err);
    }
})();

