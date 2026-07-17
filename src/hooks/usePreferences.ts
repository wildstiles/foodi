import { useState } from "react";
import type { UserPreferences } from "../types/preferences";
import { defaultPreferences } from "../services/preferences";

export function usePreferences() {
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);

  return {
    preferences,
    setPreferences,
  };
}
