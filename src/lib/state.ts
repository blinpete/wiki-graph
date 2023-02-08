import { useState } from "../core-anvaka-vs";
import { apiClient } from "./apiClient";

export const { qs, appState, performSearch, watchState } = useState(apiClient, {
  lang: "",
  // wordle: false,
  wordle: "",
});
