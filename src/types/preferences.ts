export type UserPreferences = {
  favoriteCategories: string[];

  favoriteRestaurants: string[];

  dislikedRestaurants: string[];

  preferredIntent: "quick" | "new" | "comfort" | "budget" | "surprise";

  pricePreference: "budget" | "medium" | "premium";

  adventurousness: "safe" | "balanced" | "adventurous";
};
