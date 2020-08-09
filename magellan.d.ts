//
// Definitions of all custom types
//

//Holds each recipe in the format held by the database
export interface RecipeData {
    [key: string]: string | string[][] | number | undefined,
    URL:           string,
    imageURL:      string,
    author:        string,
    recipeName:    string,
    difficulty?:   string,
    totalTime?:    string,
    prepTime?:     string,
    inactiveTime?: string,
    activeTime?:   string,
    cookTime?:     string,
    yield?:        string,
    ingredients:   string[][],
    directions:    string[][],
    source?:       string
}

//Used strictly for recipes returned from the database - includes all the same values, but with the added _id field
export interface RecipeDataResult extends RecipeData {
    [key: string]:    string | string[][] | number | undefined,
    _id:              string,
    accuracy?:        number,
    adjacency?:       number,
    brevity?:         number,
    rand?:            number,
}

//Information about each JSON file to add recipes from
export interface RecipeDataFile {
    [key: string]: string,
    filePath:      string,
    source:        string
}

//Compressed version of a recipe used by the indexing script
export interface RecipeDataCondensed {
    [key: string]: string | number,
    id:            string,
    data:          string,
    threshold:     number
}

export interface SavedRecipe {
    [key: string]: string
    _id:           string,
    recipeName:    string,
    author:        string,
    imageURL:      string
}

//Format for indexes held by database
export interface Index {
    [key: string]: string | IndexReference[] | number,
    key:           string,
    recipes:       IndexReference[],
    frequency:     number
}

//Strictly for indexes returned from the database - includes an id and all other props
export interface IndexResult extends Index {
    [key: string]: string | IndexReference[] | number,
    _id:           string,
}

//Info about each recipe stored by an index in its 'recipes' array
export interface IndexReference {
    [key: string]: string | number,
    id:            string,
    inName:        number,
    inIngs:        number
}

//Used to combine duplicate search results
export interface DuplicateRecipe {
    [key: string]: number,
    idx:           number,
    score:         number
}

//Stores time data parsed from a single string
export interface TimeData {
    [key: string]: string,
    totalTime:     string,
    prepTime:      string,
    inactiveTime:  string,
    activeTime:    string,
    cookTime:      string
}

//Stores user information
export interface User {
    [key: string]: string | string[] | undefined,
    email:         string,
    password:      string,
    savedRecipes:  string[]
}
