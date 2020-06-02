//
// Definitions of all custom types
//

//Holds each recipe in the format held by the database
interface RecipeData {
    _id: string,
    URL: string,
    imageURL: string,
    author: string,
    recipeName: string,
    difficulty?: string,
    totalTime?: string,
    prepTime?: string,
    inactiveTime?: string,
    activeTime?: string,
    cookTime?: string,
    yield?: string,
    ingredients: string[],
    directions: string[],
    source?: string
}

//Information about each JSON file to add recipes from
interface RecipeDataFile {
    filePath: string,
    source: string
}

//Compressed version of a recipe used by the indexing script
interface RecipeDataTrimmed {
    id: string,
    data: string,
    threshold: number
}

//Format for indexes held by database
interface Index {
    key: string,
    recipes: IndexReference[],
    frequency: number
}

//Info about each recipe stored by an index in its 'recipes' array
interface IndexReference {
    id: string,
    inName: number,
    inIngs: number
}
