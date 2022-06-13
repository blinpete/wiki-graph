import wiki from "wikipedia";

async function suggest(query: string) {
  const resSearch = await wiki.search(query, {
    limit: 10,
    suggestion: true,
  });
  console.log("resSearch:", resSearch);

  // const resSuggest = await wiki.suggest(query);
  // console.log("resSuggest:", resSuggest);

  // const resPage = await wiki.page(query, { autoSuggest: true });
  // console.log("resPage:", resPage);

  return resSearch.results
}

export const apiClient = {
  suggest
}