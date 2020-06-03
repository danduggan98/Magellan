//
// Definitions of all custom types
//

//Holds each recipe in the format held by the database
export interface RecipeData {
    [key: string]: string | string[] | undefined,
    _id:           string,
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
    ingredients:   string[],
    directions:    string[],
    source?:       string
}

//Information about each JSON file to add recipes from
export interface RecipeDataFile {
    [key: string]: string,
    filePath:      string,
    source:        string
}

//Compressed version of a recipe used by the indexing script
export interface RecipeDataTrimmed {
    [key: string]: string | number,
    id:            string,
    data:          string,
    threshold:     number
}

//Format for indexes held by database
export interface Index {
    [key: string]: string | IndexReference[] | number,
    key:           string,
    recipes:       IndexReference[],
    frequency:     number
}

//Info about each recipe stored by an index in its 'recipes' array
export interface IndexReference {
    [key: string]: string | number,
    id:            string,
    inName:        number,
    inIngs:        number
}

export interface DuplicateRecipe {
    [key: string]: number,
    idx:           number,
    score:         number
}
