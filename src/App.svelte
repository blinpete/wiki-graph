<script lang="ts">
  import WikiSearch from "./lib/WikiSearch.svelte";
  
  import { bus, createRenderer } from "./core-anvaka-vs";
  import {appState, performSearch, setApiClient} from "./core-anvaka-vs";
  import { apiClient } from "./lib/apiClient";

  setApiClient(apiClient)
  console.log('[App] appState:', appState)

  if (appState.query) {
    performSearch(appState.query);
  }

  const renderer = createRenderer(appState.progress);

  function showTooltip(e) {
    // console.log("🚀 showTooltip:", e)
  }
  bus.on('show-tooltip', showTooltip, {});
  // bus.on('show-details', showDetails, this);

  if (appState.graph) {
    renderer.render(appState.graph);
  }


  function onSearch(e: CustomEvent) {
    const q = e.detail
    console.log('[onSearch] query:', q);

    performSearch(q)
    renderer.render(appState.graph);
  }
</script>

<main>
  <WikiSearch on:search="{onSearch}"/>
</main>


<style>
  @import './assets/anvaka-vs.css';
  @import 'normalize.css';


  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    --borderColor: #ccc;
    --borderFocusColor: #aaa;
  }

  :global(#app) {
    position: absolute;
    z-index: 10;
  }
</style>
