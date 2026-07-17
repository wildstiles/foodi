import type { Restaurant } from "../types/restaurant";
import type { UserPreferences } from "../types/preferences";
import type { TasteMemory } from "../types/tasteMemory";

export type FoodIntent = "quick" | "new" | "comfort" | "budget" | "surprise";

export type RecommendationOptions = {
  category?: string;
  favorites?: string[];
  intent?: FoodIntent;
  memories?: TasteMemory[];
  preferences?: UserPreferences;
};

export type RecommendationResult = {
  restaurant: Restaurant;
  score: number;
  reasons: string[];
};

export function scoreRestaurant(
  restaurant: Restaurant,
  options: RecommendationOptions,
) {
  let score = 0;
  const reasons: string[] = [];

  // Category match
  if (options.category && restaurant.category === options.category) {
    score += 30;
    reasons.push(`Matches your ${options.category} preference`);
  }

  // Favorite boost
  if (options.favorites?.includes(restaurant.restaurant)) {
    score += 40;
    reasons.push("One of your favorites");
  }

  // Avoid places already visited
  if (restaurant.visited?.toLowerCase() !== "yes") {
    score += 20;

    reasons.push("You haven't tried this yet");
  }

  // User intent scoring

  if (options.intent === "new") {
    if (restaurant.visited?.toLowerCase() !== "yes") {
      score += 50;

      reasons.push("You wanted something new");
    }
  }

  if (options.intent === "comfort") {
    if (options.favorites?.includes(restaurant.restaurant)) {
      score += 50;

      reasons.push("A familiar favorite");
    }
  }

  if (options.intent === "surprise") {
    score += 15;

    reasons.push("Surprise discovery pick");
  }

  // Preference scoring

  if (options.preferences?.favoriteCategories.includes(restaurant.category)) {
    score += 35;

    reasons.push("Matches your favorite food categories");
  }

  if (
    options.preferences?.dislikedRestaurants.includes(restaurant.restaurant)
  ) {
    score -= 100;

    reasons.push("You usually avoid this place");
  }

  // Adventure preference

  if (options.preferences?.adventurousness === "adventurous") {
    if (restaurant.visited?.toLowerCase() !== "yes") {
      score += 25;
      reasons.push("Fits your adventurous style");
    }
  }

  if (options.preferences?.adventurousness === "safe") {
    if (restaurant.visited?.toLowerCase() === "yes") {
      score += 25;
      reasons.push("Matches your familiar favorites");
    }
  }

  // Taste memory boost

  const memory = options.memories?.find(
    (item) => item.restaurant === restaurant.restaurant,
  );

  if (memory) {
    if (memory.reaction === "loved") {
      score += 50;
      reasons.push("You loved this before");
    }

    if (memory.reaction === "liked") {
      score += 25;
      reasons.push("You enjoyed this before");
    }

    if (memory.reaction === "disliked") {
      score -= 50;
      reasons.push("You disliked this before");
    }
  }

  // Random factor
  score += Math.floor(Math.random() * 10);

  return {
    score,
    reasons,
  };
}

export function recommendRestaurant(
  restaurants: Restaurant[],
  options: RecommendationOptions = {},
): RecommendationResult | null {
  if (!restaurants.length) {
    return null;
  }

  const ranked = restaurants.map((restaurant) => {
    const result = scoreRestaurant(restaurant, options);

    return {
      restaurant,
      score: result.score,
      reasons: result.reasons,
    };
  });

  ranked.sort((a, b) => b.score - a.score);

  return ranked[0];
}
