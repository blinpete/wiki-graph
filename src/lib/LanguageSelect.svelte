<script lang="ts">
  import { apiClient } from "./apiClient";
  import { appState, qs } from "./state";
  import IconArrow from "./IconArrow.svelte";
  
  
  let selectedLang
  let languages


  // -----------------------
  const langFromUrl = qs.get('lang')
  if (langFromUrl) {
    selectedLang = langFromUrl
  }
  else {
    const userLang = (navigator.language || navigator.userLanguage).split('-')[0]
    console.log('user lang: ' + userLang)
    selectedLang = userLang
  }
  // -----------------------

  $: {
    selectedLang;
    console.log('[] selectedLang change:', selectedLang);

    // qs.set('lang', selectedLang)
    appState.lang = selectedLang

    apiClient.setLang(selectedLang)
  }


  apiClient.languages.subscribe(value => {
    languages = value

    console.log('langs change:', value);
    
  })
</script>

<div class="select-wrapper">
  

  <select id="searchLanguage" name="language" class="select--real" bind:value="{selectedLang}">
    {#if languages}
      {#each languages as lang}
        <option value={lang.code}>{lang['*']}</option>
      {/each}
    {/if}
  </select>

  <div class='select--fake'>
    <label for="searchLanguage">{selectedLang}</label>
    <IconArrow />
  </div>
</div>


<style lang="postcss">
  .select-wrapper {
    position: absolute;
    right: 1em;

    top: 50%;
    transform: translateY(-52%);

    font-size: 0.85rem;
    color: #54595d;


    /* width: 3.3em; */
    /* border: 1px solid hsl(0,0%,75%); */

    &:hover {
      /* from wikipedia.org */
      background-color: #f8f9fa;
    }
  }

  .select--real {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;

    width: 100%;

    color: inherit;

    appearance: none;
    opacity: 0;
    cursor: pointer;
  }

  .select--fake,
  .select--real {
    padding: 0.2em 0.3em;
    
  }

  .select--fake {
    width: 100%;
    border: 1px solid transparent;


    display: flex;
    align-items: center;
    justify-content: space-between;

    & > :global(.icon) {
      height: 0.7em;
      width: 0.7em;

      position: relative;

      display: inline-block;
      margin-left: 3px;
    }

    & label {
      text-transform: uppercase;
    }

  }

  .select--real:focus ~ .select--fake {
    border: 1px solid blue;
    /* border-color: blue; */
  }
</style>