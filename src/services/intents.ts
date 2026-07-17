export type FoodIntent = "quick" | "new" | "comfort" | "budget" | "surprise";

export type IntentOption = {
  id: FoodIntent;
  label: string;
  icon: string;
  description: string;
};

export const intents: IntentOption[] = [
  {
    id: "quick",
    label: "Quick Bite",
    icon: "🍔",
    description: "Something easy and fast",
  },

  {
    id: "new",
    label: "Something New",
    icon: "🔥",
    description: "Try somewhere different",
  },

  {
    id: "comfort",
    label: "Comfort Food",
    icon: "❤️",
    description: "A reliable favorite",
  },

  {
    id: "budget",
    label: "Budget Friendly",
    icon: "💰",
    description: "Good food without spending much",
  },

  {
    id: "surprise",
    label: "Surprise Me",
    icon: "🎲",
    description: "Let Foodi decide",
  },
];
