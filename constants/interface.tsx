export interface DogData {
    pet_id: number,
    pet_image: string,
    pet_name: string,
    pet_birthdate: string,
    pet_breed: string
};

export interface ingredients {
    id: number,
    name: string, 
    amount: string
}

export interface instructions {
    id: number,
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
    recipe_id: number,
    user_id: number,
    user: User,
    created_at: string
}

export interface DisplayRecipe {
    recipe_image: string;
    recipe_name: string;
    recipe_id: number;
    recipe_description: string;
    recipe_age_tag: string;
    recipe_size_tag: string;
    recipe_event_tag: string;
    total_likes: number;
    total_views: number;
    user_id: number;
    recipe_rating_data: {
        totalRating: number;
        avgRating: number;
    } | undefined;
    created_at: Date;
}

export interface DBRecipeData {
    recipe_name: string;
    recipe_id: number;
    recipe_description: string;
    recipe_age_tag: string;
    recipe_size_tag: string;
    recipe_event_tag: string;
    total_likes: number;
    total_views: number;
    user_id: number;
    created_at: Date;
}

export interface RecipeData {
    recipe_id: number;
    user_id: number;
    recipe_name: string;
    recipe_description: string;
    recipe_age_tag: string;
    recipe_size_tag: string;
    recipe_event_tag: string;
    total_likes: number;
    total_views: number;
    user: {
        user_id: number;
        user_codename: string;
        user_image: string;
        user_detail_id: number;
    } | undefined;
    recipe_instructions: {
        recipe_instructions_id: number;
        recipe_instructions_text: string;
    }[];
    recipe_ingredients: {
        recipe_ingredient_id: number;
        recipe_ingredients_name: string;
        recipe_ingredients_amount: string;
    }[];
    recipe_images: {
        recipe_image_id: number;
        recipe_image_title: string;
        recipe_image_subtext: string;
        recipe_image: string;
    }[];
    recipe_comments: {
        user: {
            user_image: string;
            user_id: number;
            user_codename: string;
        };
        created_at: string;
        recipe_comment_id: number;
        recipe_comment_rating: number;
        recipe_comment_subtext: string;
        recipe_comment_title: string;
        recipe_id: number;
        user_id: number;
    }[];
    recipe_rating_data: {
        totalRating: number;
        avgRating: number;
    };
}
