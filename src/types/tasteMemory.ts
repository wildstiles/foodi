export type TasteReaction = "loved" | "liked" | "okay" | "disliked";

export type TasteMemory = {
  restaurant: string;
  reaction: TasteReaction;
  category?: string;
  date: string;
};
