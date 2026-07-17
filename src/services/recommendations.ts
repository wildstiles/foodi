import type { Restaurant } from "../types/restaurant";

export function scoreRestaurant(
  restaurant: Restaurant,
  options: {
    favorites: string[];
    category?: string;
  },
) {
  let score = 0;

  // Favorite boost
  if (options.favorites.includes(restaurant.restaurant)) {
    score += 40;
  }

  // Not visited
  if (restaurant.visited !== "TRUE") {
    score += 20;
  }

  // Category match
  if (options.category && restaurant.category === options.category) {
    score += 30;
  }

  // Small randomness
  score += Math.floor(Math.random() * 20) - 10;

  return score;
}

export function recommendRestaurant(
  restaurants: Restaurant[],
  options: {
    favorites: string[];
    category?: string;
  },
) {
  return restaurants
    .map((restaurant) => ({
      restaurant,
      score: scoreRestaurant(restaurant, options),
    }))
    .sort((a, b) => b.score - a.score)[0]?.restaurant;
}
