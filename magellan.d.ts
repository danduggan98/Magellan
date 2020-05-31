interface RecipeData {
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
