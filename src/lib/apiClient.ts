import wiki from "wikipedia";


// ------------------------------------------------------------ //
//                        Auto completion                      //
// -----------------------------------------------------------//

/** Wraps `wiki.search()` method */ 
async function suggest(query: string) {
  const resSearch = await wiki.search(query, {
    limit: 10,
    suggestion: true,
  });
  console.log("resSearch:", resSearch);

  // const resSuggest = await wiki.suggest(query);
  // console.log("resSuggest:", resSuggest);

  return resSearch.results
}

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


/**
 * Uses `Legacy Wikipedia API - api.php`
 * 
 * https://www.mediawiki.org/wiki/API:Main_page
 * */
async function suggestCustom(query: string) {
  
  const apiEndpoint = getUrlSuggest(query);
  console.log("api endpoint:", apiEndpoint);
  console.log("encoded url:", encodeURI(query));
  
  const fetchSearch = await (await fetch(apiEndpoint)).json();
  console.log("fetchSearch:", fetchSearch);

  // return fetchSearch [query, suggests[], ""[], links[]]
  return fetchSearch[1]
}

// ------------------------------------------------------------ //
//                       Links & Preview                       //
// -----------------------------------------------------------//

/** Loads page links and intro. */
async function page(query: string) {
  const resPage = await wiki.page(query, { autoSuggest: true,  redirect: false });

  // REST API spec
  // https://en.wikipedia.org/api/rest_v1/#/

  console.log("resPage:", resPage);
  console.log("resPage.links:", await resPage.links());
  console.log("resPage.intro:", await resPage.intro());

  // consider showing the infobox
  // console.log("resPage.infobox:", await resPage.infobox({autoSuggest: true}));

  // requires User-Agent/Api-User-Agent header
  // console.log("resPage.summary:", await resPage.summary());

  // don't need the whole content (for a preview)
  // console.log("resPage.content:", await resPage.content());

  // the "/related" route is experimental!
  // console.log("resPage.related:", await resPage.related());
  
  // useless?
  // console.log("resPage.references:", await resPage.references());
  // console.log("resPage.categories:", await resPage.categories());

  return resPage
}

export const apiClient = {
  suggest,
  suggestCustom,
  page
}