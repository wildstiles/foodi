import type { UserPreferences } from "../types/preferences";

export const defaultPreferences: UserPreferences = {
  favoriteCategories: [],
  favoriteRestaurants: [],
  dislikedRestaurants: [],

  preferredIntent: "surprise",

  pricePreference: "medium",

  adventurousness: "balanced",
};
