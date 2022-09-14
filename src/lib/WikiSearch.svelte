<script lang="ts">
  // https://www.wikipedia.org

  import {appState, watchState} from "./state";

  let query: string = appState.query;

  let suggestions: SuggestionsCustom = [];
  let selected = 0

  import { apiClient, type SuggestionsCustom } from "./apiClient";
  import Suggestions from "./Suggestions.svelte";
  import LanguageSelect from "./LanguageSelect.svelte";
  
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()

  async function search(query) {
    console.log("[search] query:", query);
    dispatch('search', query)
    // await apiClient.page(query);
  }

  async function onKeyup(e: KeyboardEvent) {
    // input catches keydown
    // so this function should be `keyup` to get the current query

    console.log("keyup:", e);

    const q = query.trim();

    if (!q) {
      console.log("[onKeyup] empty query given!");
      query = ""
      dropSuggest()
      return;
    }

    if (e.key === "Escape") {
      dropSuggest()
      return;
    }

    if (e.key === "Enter") {
      query = suggestions[selected]?.title || q

      search(query);
      dropSuggest()
      return;
    }

    getSuggestions()
  }

  function handleArrows(e: KeyboardEvent) {
    // this is `keydown` to support arrow long press

    if (e.key === 'ArrowUp') {
      e.preventDefault()

      selected = selected ? selected-1 : suggestions.length-1
      return;
    }
    
    if (e.key === 'ArrowDown') {
      e.preventDefault()

      selected = selected === suggestions.length-1 ? 0 : selected+1
      return;
    }
  }

  async function getSuggestions() {
    const q = query.trim()
    if (!q) return

    // suggestions = await apiClient.suggest(q);
    suggestions = await apiClient.suggestCustom(q);
  }

  function onSelect(e: CustomEvent<number>) {
    query = suggestions[e.detail]?.title;
    search(query);
    dropSuggest()
  }

  function dropSuggest() {
    suggestions = [];
    selected = 0
  }

  $: isLoading = appState.progress.working
  $: message = appState.progress.message

  type AppState = typeof appState
  watchState((target: typeof appState, prop: keyof AppState, val: any) => {
    // console.log('[onChange] prop|val:', prop, val);
    switch(prop) {
      case 'message':
        message = val
      case 'working':
        isLoading = val
      default:
        return
    }
  })
</script>

<div class="input-box">
  <div class="input-wrapper">
    <input
      type="text"
      name="Wiki Search input"
      autocomplete="off"
      placeholder="start wiki search..."
      bind:value={query}
      on:keyup={onKeyup}
      on:keydown={handleArrows}
      on:blur={dropSuggest}
      autofocus
    />
    <LanguageSelect/>
  </div>

  <Suggestions {suggestions} {selected} on:select={onSelect} />
  <div class="progress-info">{
    isLoading
      ? message
      : query
      ? 'This graph was made from Wikipedia.'
      : 'Explore human knowledge..'
  }</div>
</div>

<style lang="postcss">
  .input-box {
    display: flex;
    flex-direction: column;
    width: fit-content;

    color: var(--textColor);

    margin: 0.8em;
  }

  .input-wrapper {
    position: relative;
    width: 100%;

    display: grid;
    grid-template-columns: auto min-content;
    align-items: center;

    background-color: #fff;

    border: 2px solid var(--borderColor);
    /* border-radius: 5px 5px 0 0; */
    box-shadow: inset 0 0 0 1px #fff;

    &:focus-within {
      border-color: #36c;
      box-shadow: inset 0 0 0 1px #36c;
    }
  }

  input {
    font-size: 1.2rem;
    min-width: 280px;
    padding: 0.5em;

    margin: 2px;

    outline: none;
    border: none;
    color: inherit;
  }


  .progress-info {
    font-size: small;
    padding: 0.2em 0.4em;

    background-color: #fff;
    opacity: 0.7;
    width: max-content;

    color: var(--textColorMuted);
  }
</style>
