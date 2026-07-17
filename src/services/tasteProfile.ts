import type { TasteMemory } from "../types/tasteMemory";

export function buildTasteProfile(memories: TasteMemory[]) {
  const loved = memories.filter((memory) => memory.reaction === "loved");

  const disliked = memories.filter((memory) => memory.reaction === "disliked");

  const categories: Record<string, number> = {};

  memories.forEach((memory) => {
    if (memory.category) {
      categories[memory.category] = (categories[memory.category] || 0) + 1;
    }
  });

  const favoriteCategory = Object.entries(categories).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0];

  return {
    lovedCount: loved.length,
    dislikedCount: disliked.length,
    favoriteCategory,
  };
}
