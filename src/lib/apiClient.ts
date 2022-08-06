import wiki, { relatedResult } from "wikipedia";

// https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
let isMobile = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  isMobile = true;
}

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

  return resSearch.results;
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

  const fetchSearch = (await (await fetch(apiEndpoint)).json()) as [
    string,
    string[],
    string[],
    string[]
  ];
  console.log("fetchSearch:", fetchSearch);

  // return fetchSearch [query, suggests[], ""[], links[]]
  const [, titles, , links] = fetchSearch;

  const res: SuggestionsCustom = [];
  for (let i = 0; i < titles.length; i++)
    res.push({ title: titles[i], normalized: links[i].split("/").at(-1) });

  return res;
}

export type SuggestionsCustom = { title: string; normalized: string }[];

// ------------------------------------------------------------ //
//                       Links & Preview                       //
// -----------------------------------------------------------//

/** Loads page links and intro. */
async function page(query: string) {
  const resPage = await wiki.page(query, {
    autoSuggest: true,
    redirect: false,
  });

  // REST API spec
  // https://en.wikipedia.org/api/rest_v1/#/

  // console.log("resPage:", resPage);

  // console.log("resPage.links:", await resPage.links());
  // console.log("resPage.intro:", await resPage.intro());

  // consider showing the infobox
  // console.log("resPage.infobox:", await resPage.infobox({autoSuggest: true}));

  // requires User-Agent/Api-User-Agent header
  // console.log("resPage.summary:", await resPage.summary());

  // don't need the whole content (for a preview)
  // console.log("resPage.content:", await resPage.content());

  // the "/related" route is experimental!
  // const related = await resPage.related();
  // console.log("resPage.related:", related);

  return resPage;
}

async function getSummary(query: string) {
  const summary = await wiki.summary(query);

  return summary;
}

async function getResponse(query: string) {
  const related = await wiki.related(query);

  return related.pages;
}

function getItem(item: relatedResult["pages"][number]) {
  // TODO: replace with titles.display?
  // return item.titles.normalized;

  const {
    description,
    pageid,
    extract_html,
    originalimage,
    thumbnail,
    content_urls,
  } = item;

  const page_url = isMobile
    ? content_urls.mobile.page
    : content_urls.desktop.page;

  const data = {
    description,
    pageid,
    extract_html,
    originalimage,
    thumbnail,
    page_url,
  };

  return { id: item.titles.normalized, data };
}

export const apiClient = {
  suggest,
  suggestCustom,
  page,
  getSummary,

  getResponse,
  getItem,
};
