<script lang="ts">
  import WikiSearch from "./lib/WikiSearch.svelte";
  
  import { bus, createRenderer } from "./core-anvaka-vs";
  import { useState } from "./core-anvaka-vs/useState";
  import { apiClient } from "./lib/apiClient";

  const {appState, performSearch} = useState(apiClient)
  console.log('[App] appState:', appState)

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

  <p style="position: absolute; bottom: 0;">
    <a href="https://svelte.dev/docs">svelte.dev/docs</a>
  </p>
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
    height: 100%;
  }
</style>
