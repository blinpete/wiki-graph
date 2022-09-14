<script lang="ts">
  export let suggestions: SuggestionsCustom = [];
  export let selected: number;

  import { createEventDispatcher } from "svelte";
  import type { SuggestionsCustom } from "./apiClient";
  
  type EventMap = {
    select: number
  }
  const dispatch = createEventDispatcher<EventMap>();
</script>

{#if suggestions.length}
  <ul class="suggestions">
    {#each suggestions as s, idx}
      <li
        on:click={() => dispatch("select", idx)}
        class:selected="{selected === idx}"
      >{s.title}</li>
    {/each}
  </ul>
{/if}

<style lang="postcss">
  .suggestions {
    padding: 0;
    margin: 0;
    z-index: 2;

    background-color: #fff;

    border: 2px solid var(--borderColor);
    border-top: 0;
    border-radius: 0 0 5px 5px;

    & li {
      list-style: none;
      cursor: pointer;

      padding: 0.4em 0.7em 0.25em;
      
      --pad: 0.25em;
      &:first-child {
        margin-top: var(--pad);
      }
      &:last-child {
        margin-bottom: var(--pad);
      }

      &:hover, &.selected {
        /* background-color: hsl(220, 80%, 90%); */
        /* background-color: hsl(220, 20%, 94%); */
        background-color: hsl(220, 35%, 90%);
      }
    }
  }
</style>
