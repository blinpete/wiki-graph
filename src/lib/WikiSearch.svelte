<script lang="ts">
  let query = "";

  const suggestions = [];

  import { apiClient } from "./apiRequestsClient";
  import { apiClient as apiClientCustom } from "./apiRequestsCustom";

  async function onKeyup(e: KeyboardEvent) {
    if (e.key !== "Enter") return;

    console.log("keyup:", e);

    apiClient.suggest(query);
    apiClientCustom.suggest(query);
  }
</script>

<h1>query: {query}</h1>
<input
  type="text"
  name="Wiki Search input"
  bind:value={query}
  on:keyup={onKeyup}
/>
