<script lang="ts">
  import WikiSearch from "./lib/WikiSearch.svelte";

  import { bus, createRenderer } from "./core-anvaka-vs";
  import { appState, performSearch } from "./lib/state";
  import { apiClient, isMobile } from "./lib/apiClient";
  import About from "./lib/About.svelte";

  let aboutVisible = false;

  // console.log('[App] appState:', appState)

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
   *  3. perform search if query isn't empty (to this moment `lang` should be properly set)
   */

  const DEFAULT_LANG = "en";
  apiClient.setLang(appState.lang || DEFAULT_LANG);
  // ---------------------------------------------------

  const wordlePlaceholder = '...'

  function isWordleOn() {
    return appState.wordle.toString().includes('true')
  }

  /**
   * this funciton garantees that hidden
   * nodes don't flash on first render
   **/
  function getText(node) {
    console.log("🚀 | getText | node", node)
    
    const ids = getWordleIdsSet()
    
    if (isWordleOn() && ids.has(node?.data?.pageid?.toString())) {
      return wordlePlaceholder
    }

    return node.id
  }

  function wordleAddNodeHook(node, ui, text) {
    // if (!isWordleOn()) return
    
    const ids = getWordleIdsSet()

    if(ids.has(node?.data?.pageid?.toString())) {
      wordleNodes.set(node.data.pageid, {node, ui, text})
    }
  }

  const renderer = createRenderer(appState.progress, isMobile, getText, wordleAddNodeHook);

  if (appState.query) {
    performSearchWrap(appState.query).then((res) => {
      if (appState.graph) {
        renderer.render(appState.graph);
      }
    });
  }

  function dropWordleIds() {
    wordleNodes.forEach(obj => {
      obj.text.text(obj.node.id)
    })
    wordleNodes.clear()
    appState.wordle = true
  }

  function toggleWordleMode() {
    const ids = getWordleIdsSet()

    if (ids.has('true')) {
      ids.delete('true')
      ids.add('false')

      wordleNodes.forEach(obj => {
        obj.text.text(obj.node.id)
      })
    } else {
      ids.delete('false')
      ids.add('true')

      wordleNodes.forEach(obj => {
        obj.text.text(wordlePlaceholder)
      })
    }
    appState.wordle = [...ids].join(wordleIdSep)
  }

  // ------------------------------------------ tooltip
  let isTooltipHidden = true;
  let tooltipHTML = "";
  let tooltipEl;
  let hidingTimer: NodeJS.Timeout;
  let showingTimer: NodeJS.Timeout;

  const ttWidth = 400;
  const ttHeight = 500;

  function scheduleHide() {
    // console.log("🚀 sheduleHide")

    return setTimeout(() => {
      // console.log("🚀🚀 hide")

      isTooltipHidden = true;
    }, 100);
  }

  function scheduleShow() {
    // console.log("🚀 sheduleShow")

    return setTimeout(() => {
      // console.log("🚀🚀 show")

      isTooltipHidden = false;
      clearTimeout(showingTimer);
      showingTimer = null;
    }, 200);
  }

  function onEnterTooltip() {
    // console.log("🚀 ~ onEnterTooltip")
    clearTimeout(hidingTimer);
  }

  function onLeaveTooltip() {
    // console.log("🚀 ~ onLeaveTooltip")
    hidingTimer = scheduleHide();
  }

  function showTooltipNode(e) {
    console.log("🚀 ~ showTooltipNode ~ e", e)
    // console.log("🚀 ~ showTooltipNode ~ e", visualViewport)

    if (isWordleOn() && appState.wordle.toString().includes(e.node?.data?.pageid?.toString())) {
      return  
    }

    clearTimeout(hidingTimer);

    if (!e.node) {
      hidingTimer = scheduleHide();
      clearTimeout(showingTimer);
      showingTimer = null;
      return;
    }

    if (showingTimer) {
      return;
    }

    // ------------------------ direction
    const center = {
      x: visualViewport.width / 2,
      y: visualViewport.height / 2,
    };

    const sign = {
      x: center.x - e.x,
      y: center.y - e.y,
    };

    const isUp = sign.y < 0;
    // ----------------------------------

    // TODO: should sanitize?
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API
    const { thumbnail, extract_html, page_url } = e.node.data;
    tooltipHTML = thumbnail ? `<img src="${thumbnail.source}" />` : "";

    const fallbackText = `Can't find a preview. See <a href="${page_url}">the original article</a>`;
    tooltipHTML += `<div class="text">${extract_html || fallbackText}</div>`;

    // reuse current tooltip
    // if (!isTooltipHidden) {
    //   return
    // }

    showingTimer = scheduleShow();

    let left: number;
    requestAnimationFrame(() => {
      // shift a bit left
      left = e.x - ttWidth / 3;

      // keep within viewport
      left = Math.max(10, left);
      left = Math.min(visualViewport.width - ttWidth - 10, left);

      tooltipEl.style.left = left + "px";

      if (isUp) {
        tooltipEl.style.top = "unset";
        tooltipEl.style.bottom = visualViewport.height - e.y + 20 + "px";
      } else {
        tooltipEl.style.top = e.y + 20 + "px";
        tooltipEl.style.bottom = "unset";
      }

      // ---------------- test: static corner
      // tooltipEl.style.bottom = 0
      // tooltipEl.style.top = 'unset'
      // tooltipEl.style.right = 0
      // tooltipEl.style.left = 'unset'
      // ---------------------------------------
    });
  }

  bus.on("show-tooltip-node", showTooltipNode, {});

  const wordleIdSep = '-'
  function getWordleIdsSet() {
    return new Set(appState.wordle.toString().split(wordleIdSep))
  }
  function toggleWordleId(id: number | string) {
    const ids = getWordleIdsSet()
    console.log("🚀 | toggleWordleId | ids", ids)

    const str = id.toString()
    const deleted = ids.delete(str)

    if (!deleted) {
      ids.add(str)
    }

    appState.wordle = [...ids].join(wordleIdSep)

    return !deleted
  }

  const wordleNodes = new Map()

  // --------------------------------------- node click
  function onNodeClick(e) {
    console.log("🚀 ~ onNodeClick ~ e", e)

    if (!isWordleOn()) {
      window.open(e.node.data.page_url);
    }
    else {
      console.log("🚀 | onNodeClick | e.node.data", e.node.data)
      const isIdSelected = toggleWordleId(e.node.data.pageid)
      
      if (isIdSelected) {
        e.text.text(wordlePlaceholder)
        wordleNodes.set(e.node.data.pageid, e)
      } else {
        e.text.text(e.node.id)
        wordleNodes.delete(e.node.data.pageid)
      }
    }

    // window.open(e.node.data.page_url, '_blank')
  }

  bus.on("show-details-node", onNodeClick, {});

  function onNodeClickRight(e) {
    // console.log("🚀 ~ onNodeClickRight ~ e", e)

    appState.query = e.node.id;
    onSearch({ detail: e.node.id });
  }

  bus.on("node-click-right", onNodeClickRight, {});

  // --------------------------------------- functions
  async function onSearch(e: CustomEvent) {
    const q = e.detail;
    // console.log('[onSearch] query:', q);

    await performSearchWrap(q);
    renderer.render(appState.graph);
  }

  async function performSearchWrap(query) {
    const summary = await apiClient.getSummary(query);
    // console.log('[summary]', summary);

    const entryItem = apiClient.getItem(summary);
    performSearch(entryItem);
  }
</script>

<!-- <main class="app-container"> -->
{#if !appState.wordle.toString().includes('true')}
  <WikiSearch on:search={onSearch} />
{/if}

<div class="layout-container about-links muted">
  {#if appState.wordle.toString().includes('true')}
    <a href="#" on:click={dropWordleIds}>drop wordle setup</a>
  {/if}
  <a href="#" on:click={toggleWordleMode}>{'wordle ' + (appState.wordle.toString().includes('true') ? 'on' : 'off')}</a>
  <a href="#" on:click={() => (aboutVisible = true)}>about</a>
  <a
    href="https://github.com/blinpete/wiki-graph"
    target="_blank"
    rel="noopener noreferrer">code</a
  >
</div>

<div
  id="tooltip"
  bind:this={tooltipEl}
  hidden={isTooltipHidden}
  on:mouseenter={onEnterTooltip}
  on:mouseleave={onLeaveTooltip}
>
  {@html tooltipHTML}
</div>
<!-- </main> -->

{#if aboutVisible}
  <About on:hide={() => (aboutVisible = false)} />
{/if}

<style lang="postcss">
  /* order matters */
  @import "./assets/style.css";
  @import "normalize.css";
</style>
