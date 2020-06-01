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

interface RecipeDataFile {
    filePath: string,
    source: string
}

interface RecipeDataTrimmed {
    id: string,
    data: string,
    threshold: number
}

interface Index {
    key: string,
    recipes: IndexReference[],
    frequency: number
}

interface IndexReference {
    id: string,
    inName: number,
    inIngs: number
}
