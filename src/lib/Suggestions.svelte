<script lang="ts">
  export let suggestions: SuggestionsCustom = [];

  import { createEventDispatcher } from "svelte";
  import type { SuggestionsCustom } from "./apiClient";
  
  type EventMap = {
    select: SuggestionsCustom[number]
  }
  const dispatch = createEventDispatcher<EventMap>();
</script>

{#if suggestions.length}
  <ul class="suggestions">
    {#each suggestions as s}
      <li on:click={() => dispatch("select", s)}>{s.title}</li>
    {/each}
  </ul>
{/if}

<style lang="postcss">
  .suggestions {
    padding: 10px;
    margin: 0;

    border: 2px solid var(--borderColor);
    border-top: 0;

    border-radius: 0 0 5px 5px;

    & li {
      list-style: none;
      cursor: pointer;

      &:hover {
        font-weight: bold;
      }
    }
  }
</style>
