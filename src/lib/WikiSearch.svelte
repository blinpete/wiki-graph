<script lang="ts">
  // https://www.wikipedia.org

  let query = "";

  let suggestions = [];

  import { apiClient } from "./apiClient";
  import Suggestions from "./Suggestions.svelte";

  async function onKeyup(e: KeyboardEvent) {
    if (e.key !== "Enter") return;

    console.log("keyup:", e);

    // suggestions = await apiClient.suggest(query);
    suggestions = await apiClient.suggestCustom(query);

    // await apiClient.page(query);
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
  <Suggestions {suggestions} />
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

    border: 2px #ccc solid;
    border-radius: 2px;
  }
  input:focus {
    border-color: #aaa;
  }
</style>
