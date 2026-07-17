import type { Restaurant } from "../types/restaurant";

export type FoodIntent = "quick" | "new" | "comfort" | "budget" | "surprise";

export type RecommendationOptions = {
  category?: string;
  favorites?: string[];
  intent?: FoodIntent;
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
