import { createContext, useContext, useState } from "react";

import type { TasteMemory, TasteReaction } from "../types/tasteMemory";

type TasteMemoryContextType = {
  memories: TasteMemory[];
  addMemory: (
    restaurant: string,
    reaction: TasteReaction,
    category?: string,
  ) => void;
};

const TasteMemoryContext = createContext<TasteMemoryContextType | undefined>(
  undefined,
);

export function TasteMemoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <TasteMemoryContext.Provider
      value={{
        memories,
        addMemory,
      }}
    >
      {children}
    </TasteMemoryContext.Provider>
  );
}

export function useTasteMemoryContext() {
  const context = useContext(TasteMemoryContext);

  if (!context) {
    throw new Error(
      "useTasteMemoryContext must be used inside TasteMemoryProvider",
    );
  }

  return context;
}
