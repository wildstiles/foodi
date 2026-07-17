import type { UserPreferences } from "../../types/preferences";
import "./PreferencePanel.css";

type Props = {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
};

export default function PreferencePanel({
  preferences,
  setPreferences,
}: Props) {
  return (
    <div className="preference-panel">
      <h2>Food Preferences</h2>

      <h3>Adventure Level</h3>

      <button
        className={
          preferences.adventurousness === "safe"
            ? "intent-card active"
            : "intent-card"
        }
        onClick={() =>
          setPreferences({
            ...preferences,
            adventurousness: "safe",
          })
        }
      >
        🛟 Safe
      </button>

      <button
        className={
          preferences.adventurousness === "balanced"
            ? "intent-card active"
            : "intent-card"
        }
        onClick={() =>
          setPreferences({
            ...preferences,
            adventurousness: "balanced",
          })
        }
      >
        ⚖️ Balanced
      </button>

      <button
        className={
          preferences.adventurousness === "adventurous"
            ? "intent-card active"
            : "intent-card"
        }
        onClick={() =>
          setPreferences({
            ...preferences,
            adventurousness: "adventurous",
          })
        }
      >
        🚀 Adventurous
      </button>

      <h3>Budget</h3>

      <button
        className={
          preferences.pricePreference === "budget"
            ? "intent-card active"
            : "intent-card"
        }
        onClick={() =>
          setPreferences({
            ...preferences,
            pricePreference: "budget",
          })
        }
      >
        💰 Budget
      </button>

      <button
        className={
          preferences.pricePreference === "medium"
            ? "intent-card active"
            : "intent-card"
        }
        onClick={() =>
          setPreferences({
            ...preferences,
            pricePreference: "medium",
          })
        }
      >
        💵 Medium
      </button>

      <button
        className={
          preferences.pricePreference === "premium"
            ? "intent-card active"
            : "intent-card"
        }
        onClick={() =>
          setPreferences({
            ...preferences,
            pricePreference: "premium",
          })
        }
      >
        💎 Premium
      </button>
    </div>
  );
}
