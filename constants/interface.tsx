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
    fileThumbnailsLength: string,
    age: string,
    size: string,
    event: string,
    recipeIngredients: Array<ingredients>,
    recipeInstructions: Array<instructions>
}

export interface userDetails {
    pets: DogData[];
    user_codename: string;
    user_detail_id: number;
    user_image: string;
}

export interface User {
    user_id: number,
    user_image: string,
    user_codename: string
}

export interface Comment {
    recipe_comment_id: number,
    recipe_comment_rating: number,
    recipe_comment_subtext: string,
    recipe_comment_title: string,
    user_id: number,
    user: User,
    created_at: Date
}

