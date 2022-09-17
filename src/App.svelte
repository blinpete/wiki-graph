<script lang="ts">
  import WikiSearch from "./lib/WikiSearch.svelte";
  
  import { bus, createRenderer } from "./core-anvaka-vs";
  import { appState, performSearch } from "./lib/state";
  import { apiClient } from "./lib/apiClient";

  console.log('[App] appState:', appState)

  // ------------------------------------------ language
  /**
   * can't do this in useState
   * (core-anvaka-vs module doesn't know about apiClient.setLang method)
   * 
   * so setting a language here.
   * 
   * Use case:
   *  1. first load
   *  2. collect appState from url
   *  3. performSearch if query isn't empty (to this moment `lang` should be properly set)
   */
  
  const DEFAULT_LANG = 'en'
  apiClient.setLang(appState.lang || DEFAULT_LANG)
  // ---------------------------------------------------


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

  const ttWidth = 400
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
    const {thumbnail, extract_html, page_url} = e.node.data
    tooltipHTML = thumbnail ? `<img src="${thumbnail.source}" />` : ''

    const fallbackText = `Can't find a preview. See <a href="${page_url}">the original article</a>`
    tooltipHTML += `<div class="text">${extract_html || fallbackText}</div>`

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

<main class="app-container">
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
  /* order matters */
  @import './assets/style.css';
  @import 'normalize.css';
</style>
