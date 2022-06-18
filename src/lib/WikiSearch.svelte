<script lang="ts">
  // https://www.wikipedia.org

  let query = "";

  let suggestions = [];

  import { apiClient } from "./apiClient";
  import Suggestions from "./Suggestions.svelte";

  function search(query) {
    console.log("[search] query:", query);
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

    // await apiClient.page(q);
  }

  function onSelect(e: CustomEvent) {
    query = e.detail;
    suggestions = [];
    search(query);
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
