import { Generated } from "kysely";

export interface Database {
  users_table: UserTable;
  user_details_table: UserDetailTable;
  pets_table: PetsTable;
  allergies_table: AllergiesTable;
  recipes_table: RecipesTable;
  recipe_comments_table: RecipeCommentsTable;
  recipe_images_table: RecipeImagesTable;
  recipe_ingredients_table: RecipeIngredientsTable;
  recipe_instructions_table: RecipeInstructionsTable;
  favourites_table: FavouritesTable;
  likes_table: LikesTable;
  notifications_table: NotificationsTable;
}

export interface UserTable {
  user_id: Generated<number>;
  google_id: string;
  email: string;
  password:string;
  user_lvl: number;
  updated_at: Date;
  created_at: Date;
}

export interface UserDetailTable {
  user_detail_id: Generated<number>;
  user_first_name: string;
  user_last_name: string;
  user_codename: string;
  user_image: string;
  user_agreement: number;
  user_gender: string;
  user_birthdate: Date;
  user_id: number;
  user_occupation: string;
  updated_at: Date;
  created_at: Date;
}

export interface PetsTable {
  pet_id: Generated<number>;
  pet_name: string;
  pet_birthdate: Date;
  pet_breed: string;
  pet_image: string;
  user_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface AllergiesTable {
  allergy_id: Generated<number>;
  allergy_name: string;
  allergy_ingredient: string;
  pet_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface RecipesTable {
  recipe_id: Generated<number>;
  recipe_name: string;
  recipe_description: string;
  recipe_age_tag: string;
  recipe_size_tag: string;
  recipe_event_tag: string;
  recipe_category: string;
  total_likes: number;
  total_favourites: number;
  total_views: number;
  user_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface RecipeCommentsTable {
  recipe_comment_id: Generated<number>;
  recipe_comment_title: string;
  recipe_comment_subtext: string;
  recipe_comment_rating: number;
  user_id: number;
  recipe_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface RecipeImagesTable {
  recipe_image_id: Generated<number>;
  recipe_image_title: string;
  recipe_image_subtext: string;
  recipe_image: string;
  recipe_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface RecipeInstructionsTable {
  recipe_instructions_id: Generated<number>;
  recipe_instructions_text: string;
  recipe_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface RecipeIngredientsTable {
  recipe_ingredient_id: Generated<number>;
  recipe_ingredients_name: string;
  recipe_ingredients_amount: string;
  recipe_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface FavouritesTable {
  favourite_id: Generated<number>;
  user_id: number;
  recipe_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface LikesTable {
  like_id: Generated<number>;
  user_id: number;
  recipe_id: number;
  is_liked: boolean;
  updated_at: Date;
  created_at: Date;
}

export interface NotificationsTable {
  notification_id: Generated<number>;
  user_id: number;
  notification_content: string;
  updated_at: Date;
  created_at: Date;
}