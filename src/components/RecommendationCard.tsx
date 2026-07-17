import { useState } from "react";
import { recommendRestaurant } from "../services/recommendations";
import type { Restaurant } from "../types/restaurant";
type Props = {
  restaurants: Restaurant[];
};

export default function RecommendationCard({ restaurants }: Props) {
  const [recommendation, setRecommendation] = useState<Restaurant | null>(null);

  function pickRestaurant() {
    const result = recommendRestaurant(restaurants, {
      favorites: [],
    });

    if (result) {
      setRecommendation(result);
    }
  }

  return (
    <div className="recommendation-card">
      <h2>🍽️ Foodi Recommendation</h2>

      {recommendation ? (
        <>
          <h3>{recommendation.restaurant}</h3>

          <p>{recommendation.category}</p>
        </>
      ) : (
        <p>Press the button to get a recommendation.</p>
      )}

      <button onClick={pickRestaurant}>🎲 Recommend Again</button>
    </div>
  );
}
