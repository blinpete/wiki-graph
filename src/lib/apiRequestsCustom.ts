const getUrlSuggest = (query) =>
  `
  https://en.wikipedia.org/w/api.php
  ?action=opensearch
  &format=json
  &formatversion=2
  &search=${query}
  &namespace=0
  &limit=10
  &origin=*`.replaceAll(/\n\s*/g, "");


async function suggest(query: string) {
  const apiEndpoint = getUrlSuggest(query);
  console.log("api endpoint:", apiEndpoint);
  console.log("encoded url:", encodeURI(query));
  
  const fetchSearch = await (await fetch(apiEndpoint)).json();
  console.log("fetchSearch:", fetchSearch);

  return fetchSearch
}

export const apiClient = {
  suggest
}