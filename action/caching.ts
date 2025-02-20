import NodeCache, { Key } from "node-cache";

export const highDynamicData = new NodeCache({ stdTTL: 300 });
export const lowDynamicData = new NodeCache({ stdTTL: 86400 });

// Cache Keys
export const weeklyRecipesCacheKey = `weekly-recipes`;
export const popularRecipesCacheKey = `popular-recipes`;

export const paginatedReicpesCacheKey = (page: number, limit: number): Key =>
  `recipes-${page}-${limit}`;

export const searchRecipeCacheKey = (searchString: String): Key =>
  `search-recipes-${searchString}`;

export const recipeCreatedWithOffsetCacheKey = (
  off: number,
  user_id: number
): Key => `recipes-created-${off}-${user_id}`;

export const recipeLikesWithOffsetCacheKey = (
  off: number,
  user_id: number
): Key => `recipes-liked-${off}-${user_id}`;
