import type { UserPreferences } from "../../types/preferences";

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
