import { useState } from "react";
import { recommendRestaurant } from "../services/recommendations";
import type { RecommendationResult } from "../services/recommendations";
import type { Restaurant } from "../types/restaurant";
import { intents } from "../services/intents";
import { usePreferences } from "../hooks/usePreferences";

type Props = {
  restaurants: Restaurant[];
};

export default function RecommendationCard({ restaurants }: Props) {
  const { preferences } = usePreferences();

  const [recommendation, setRecommendation] =
    useState<RecommendationResult | null>(null);

  const [intent, setIntent] = useState<
    "quick" | "new" | "comfort" | "budget" | "surprise"
  >("surprise");

  function pickRestaurant() {
    const result = recommendRestaurant(restaurants, {
      favorites: [],
      intent,
      preferences,
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
          <h4>
            {intents.find((item) => item.id === intent)?.icon}{" "}
            {intents.find((item) => item.id === intent)?.label}
          </h4>
          return (
          <div className="recommendation-card">
            <h2>ðŸ½ï¸ Foodi Recommendation</h2>

            {recommendation ? (
              <>
                <h4>
                  {intents.find((item) => item.id === intent)?.icon}{" "}
                  {intents.find((item) => item.id === intent)?.label}
                </h4>
                <h3>{recommendation.restaurant.restaurant}</h3>
                import {intents} from "../services/intents";
                <ul>
                  {recommendation.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
                <p>{recommendation.restaurant.category}</p>
              </>
            ) : (
              <p>Press the button to get a recommendation.</p>
            )}

            <div>
              <h3>What are you feeling?</h3>

              {intents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setIntent(item.id)}
                  className={
                    intent === item.id ? "intent-card active" : "intent-card"
                  }
                >
                  <span>
                    {item.icon} {item.label}
                  </span>

                  <small>{item.description}</small>
                </button>
              ))}
            </div>

            <button onClick={pickRestaurant}>ðŸŽ² Recommend Again</button>
          </div>
          );
        </>
      ) : (
        <p>Press the button to get a recommendation.</p>
      )}

      <div>
        <h3>What are you feeling?</h3>

        {intents.map((item) => (
          <button
            key={item.id}
            onClick={() => setIntent(item.id)}
            className={
              intent === item.id ? "intent-card active" : "intent-card"
            }
          >
            <span>
              {item.icon} {item.label}
            </span>

            <small>{item.description}</small>
          </button>
        ))}
      </div>

      <button onClick={pickRestaurant}>🎲 Recommend Again</button>
    </div>
  );
}
