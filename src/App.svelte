<script lang="ts">
  import WikiSearch from "./lib/WikiSearch.svelte";
  
  import { bus, createRenderer } from "./core-anvaka-vs";
  import { appState, performSearch } from "./lib/state";
  import { apiClient } from "./lib/apiClient";

  console.log('[App] appState:', appState)

  const renderer = createRenderer(appState.progress);

  if (appState.query) {
    performSearchWrap(appState.query).then(res => {
      if (appState.graph) {
        renderer.render(appState.graph);
      }
    });
  }


  // ------------------------------------------ tooltip
  let isTooltipHidden = true
  let tooltipHTML = ''
  let tooltipEl
  let hidingTimer: NodeJS.Timeout

  const ttWidth = 300
  const ttHeight = 500

  function scheduleHide() {
    return setTimeout(() => isTooltipHidden = true, 100)
  }

  function onEnterTooltip() {
    console.log("🚀 ~ onEnterTooltip")
    clearTimeout(hidingTimer)
  }

  function onLeaveTooltip() {
    console.log("🚀 ~ onLeaveTooltip")
    hidingTimer = scheduleHide()
  }

  function showTooltipNode(e) {
    console.log("🚀 ~ showTooltipNode ~ e", e)
    // console.log("🚀 ~ showTooltipNode ~ e", visualViewport)
    
    clearTimeout(hidingTimer)

    if (!e.node) {
      hidingTimer = scheduleHide()
      return
    }

    // TODO: should sanitize?
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API
    const {thumbnail, extract_html} = e.node.data
    tooltipHTML = thumbnail ? `<img src="${thumbnail.source}" style="width: 100%;"/>` : ''
    tooltipHTML += extract_html

    // reuse current tooltip
    // if (!isTooltipHidden) {
    //   return
    // }

    isTooltipHidden = false
    
    let left
    requestAnimationFrame(() => {
      // shift a bit left
      left = e.x - ttWidth/3
      
      // keep within viewport
      left = Math.max(5, left)
      left = Math.min(visualViewport.width - ttWidth - 5, left)

      tooltipEl.style.left = left + 'px'
  
      tooltipEl.style.top = e.y + 15 + 'px'
    })

  }
  
  bus.on('show-tooltip-node', showTooltipNode, {});


  // --------------------------------------- node click
  function onNodeClick(e) {
    console.log("🚀 ~ onNodeClick ~ e", e)
    window.open(e.node.data.page_url)
    // window.open(e.node.data.page_url, '_blank')

  }

  bus.on('show-details-node', onNodeClick, {});
  
  
  // --------------------------------------- functions
  async function onSearch(e: CustomEvent) {
    const q = e.detail
    console.log('[onSearch] query:', q);

    await performSearchWrap(q)
    renderer.render(appState.graph);
  }

  async function performSearchWrap(query) {
    const summary = await apiClient.getSummary(query)
    console.log('[summary]', summary);
    
    const entryItem = apiClient.getItem(summary)
    performSearch(entryItem)
  }
</script>

<main>
  <WikiSearch on:search="{onSearch}"/>
  <div
    id="tooltip"
    bind:this={tooltipEl}
    hidden={isTooltipHidden}
    on:mouseenter="{onEnterTooltip}"
    on:mouseleave="{onLeaveTooltip}"
  >{@html tooltipHTML}</div>
</main>


<style lang="postcss">
  @import './assets/anvaka-vs.css';
  @import 'normalize.css';

  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    font-size: 80%;

    --borderColor: #ccc;
    --borderFocusColor: #aaa;
  }

  :global(#app) {
    position: absolute;
    z-index: 10;
  }

  /* tooltip */
  #tooltip {
    z-index: 20;
    position: absolute;

    border: 2px solid #ddd;
    /* pointer-events: none; */

    background-color: #fff;

    /* width: min(300px, 30vw); */
    width: 300px;

    max-height: min(500px, 50vh);
    overflow-y: auto;

    padding: 0.5em 1em;

    /* & > img {
      width: 100%;
    } */
  }
</style>
