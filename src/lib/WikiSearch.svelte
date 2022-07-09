<script lang="ts">
  // https://www.wikipedia.org


  import {appState} from "../core-anvaka-vs";

  let query = appState.query;

  let suggestions: SuggestionsCustom = [];

  import { apiClient, type SuggestionsCustom } from "./apiClient";
  import Suggestions from "./Suggestions.svelte";
  
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()

  async function search(query) {
    console.log("[search] query:", query);
    dispatch('search', query)
    // await apiClient.page(query);
  }

  async function onKeyup(e: KeyboardEvent) {
    console.log("keyup:", e);

    const q = query.trim();
    if (!q) {
      console.log("[onKeyup] empty query given!");
      suggestions = [];
      return;
    }

    if (e.key === "Enter") {
      search(q);
      return;
    }

    // suggestions = await apiClient.suggest(q);
    suggestions = await apiClient.suggestCustom(q);
  }

  function onSelect(e: CustomEvent<SuggestionsCustom[number]>) {
    query = e.detail.title;
    suggestions = [];
    search(e.detail.normalized);
  }
</script>

<div class="input-box">
  <input
    type="text"
    name="Wiki Search input"
    placeholder="start wiki search..."
    bind:value={query}
    on:keyup={onKeyup}
  />
  <Suggestions {suggestions} on:select={onSelect} />
</div>

<style>
  .input-box {
    display: flex;
    flex-direction: column;
    width: fit-content;
  }

  input {
    font-size: 1.4rem;
    color: #444;

    outline: none;

    padding: 4px 10px 6px;

    border: 2px solid var(--borderColor);
    /* border-radius: 5px 5px 0 0; */
  }

  input:focus::placeholder {
    /* border-color: var(--borderFocusColor); */
    visibility: hidden;
  }
</style>
