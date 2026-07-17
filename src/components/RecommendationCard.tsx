import { useState } from "react";
import "./RecommendationCard.css";
import { recommendRestaurant } from "../services/recommendations";
import type { RecommendationResult } from "../services/recommendations";
import type { Restaurant } from "../types/restaurant";
import { intents } from "../services/intents";

import type { UserPreferences } from "../types/preferences";

type Props = {
  restaurants: Restaurant[];
  preferences: UserPreferences;
};

export default function RecommendationCard({
  restaurants,
  preferences,
}: Props) {
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
      <h2>⭐ Today's Pick</h2>

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
                <div className="recommendation-intent">
                  {intents.find((item) => item.id === intent)?.icon}{" "}
                  {intents.find((item) => item.id === intent)?.label}
                </div>
                <div className="recommendation-title">
                  <h3>{recommendation.restaurant.restaurant}</h3>
                  <p>{recommendation.restaurant.category}</p>
                </div>
                import {intents} from "../services/intents";
                <ul>
                  {recommendation.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
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
