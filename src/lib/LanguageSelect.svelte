<script lang="ts">
  import { apiClient } from "./apiClient";
import IconArrow from "./IconArrow.svelte";
  import { appState, qs } from "./state";

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
  <label for="searchLanguage">{selectedLang}</label>
  <select id="searchLanguage" name="language" class="select-lang" bind:value="{selectedLang}">
    {#if languages}
      {#each languages as lang}
        <option value={lang.code}>{lang['*']}</option>
      {/each}
    {/if}
  </select>
</div>


<style>
  .select-wrapper {
    position: absolute;
    right: 1em;
    top: 20%;
  }

  .select-lang {
    position: absolute;
    right: 0;
    

    width: 4em;
  }

</style>