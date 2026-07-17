import { useState } from "react";
import type { TasteMemory, TasteReaction } from "../types/tasteMemory";

export function useTasteMemory() {
  const [memories, setMemories] = useState<TasteMemory[]>(() => {
    const saved = localStorage.getItem("foodi-taste-memory");

    return saved ? JSON.parse(saved) : [];
  });

  function addMemory(
    restaurant: string,
    reaction: TasteReaction,
    category?: string,
  ) {
    const memory: TasteMemory = {
      restaurant,
      reaction,
      category,
      date: new Date().toISOString(),
    };

    setMemories((current) => {
      const updated = [...current, memory];

      localStorage.setItem("foodi-taste-memory", JSON.stringify(updated));

      return updated;
    });
  }

  return {
    memories,
    addMemory,
  };
}
