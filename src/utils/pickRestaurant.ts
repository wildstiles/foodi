import { Restaurant } from "../hooks/useRestaurants";

export function pickRestaurant(
  restaurants: Restaurant[],
  userLocation?: {
    lat: number;
    lng: number;
  } | null,
) {
  const validRestaurants = restaurants.filter((r) => r.lat && r.lng);

  if (validRestaurants.length === 0) {
    return null;
  }

  const shuffled = [...validRestaurants].sort(() => Math.random() - 0.5);

  return shuffled[0];
}
