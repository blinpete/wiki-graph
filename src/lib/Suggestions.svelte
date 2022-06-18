<script lang="ts">
  export let suggestions = [];

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
</script>

{#if suggestions.length}
  <ul class="suggestions">
    {#each suggestions as s}
      <li on:click={() => dispatch("select", s)}>{s}</li>
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
