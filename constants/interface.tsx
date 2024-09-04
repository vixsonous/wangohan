export interface DogData {
    pet_id: number,
    pet_image: string,
    pet_name: string,
    pet_birthdate: Date,
    pet_breed: string
};

export interface ingredients {
    name: string, 
    amount: string
}

export interface instructions {
    text: string
}
export interface recipe {
    recipeTitle: string,
    recipeDescr: string,
    recipeThumbnail: string,
    age: string,
    size: string,
    event: string,
    recipeIngredients: Array<ingredients>,
    recipeInstructions: Array<instructions>
}

