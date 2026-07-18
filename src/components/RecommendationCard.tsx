import { useState } from "react";
import "./RecommendationCard.css";
import { recommendRestaurant } from "../services/recommendations";
import type { RecommendationResult } from "../services/recommendations";
import type { Restaurant } from "../types/restaurant";
import { intents } from "../services/intents";
import { useTasteMemoryContext } from "../context/TasteMemoryContext";
import type { UserPreferences } from "../types/preferences";

type Props = {
  restaurants: Restaurant[];
  preferences: UserPreferences;
};

export default function RecommendationCard({
  restaurants,
  preferences,
}: Props) {
  const { memories, addMemory } = useTasteMemoryContext();

  const [recommendation, setRecommendation] =
    useState<RecommendationResult | null>(null);

  const [intent, setIntent] = useState<
    "quick" | "new" | "comfort" | "budget" | "surprise"
  >("surprise");

  function pickRestaurant() {
    const result = recommendRestaurant(restaurants, {
      favorites: [],
      intent,
      memories,
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
          <div className="recommendation-intent">
            {intents.find((item) => item.id === intent)?.icon}{" "}
            {intents.find((item) => item.id === intent)?.label}
          </div>

          <div className="recommendation-title">
            <h3>{recommendation.restaurant.restaurant}</h3>
            <p>{recommendation.restaurant.category}</p>

            <div className="taste-feedback">
              <button
                onClick={() =>
                  addMemory(
                    recommendation.restaurant.restaurant,
                    "loved",
                    recommendation.restaurant.category,
                  )
                }
              >
                ❤️ Loved
              </button>

              <button
                onClick={() =>
                  addMemory(
                    recommendation.restaurant.restaurant,
                    "liked",
                    recommendation.restaurant.category,
                  )
                }
              >
                👍 Good
              </button>

              <button
                onClick={() =>
                  addMemory(
                    recommendation.restaurant.restaurant,
                    "okay",
                    recommendation.restaurant.category,
                  )
                }
              >
                😐 Okay
              </button>

              <button
                onClick={() =>
                  addMemory(
                    recommendation.restaurant.restaurant,
                    "disliked",
                    recommendation.restaurant.category,
                  )
                }
              >
                👎 Skip
              </button>
            </div>
          </div>

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

      <button onClick={pickRestaurant}>🎲 Recommend Again</button>
    </div>
  );
}
