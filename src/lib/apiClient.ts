import wiki, { relatedResult, wikiSummary } from "wikipedia";
import { appState } from "./state";
// TODO: get rid of `wikipedia` pkg


// https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
export let isMobile = false;
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  isMobile = true;
}

function __minimizeUrl(url: string) {
  return url.replaceAll(/\n\s*/g, "");
}

let restApiLang = 'en'

function RestApiBase() {
  return `https://${restApiLang}.wikipedia.org/api/rest_v1`
}

// ------------------------------------------------------------ //
//                        Auto completion                      //
// -----------------------------------------------------------//

/** Wraps `wiki.search()` method */
// async function suggest(query: string) {
//   const resSearch = await wiki.search(query, {
//     limit: 10,
//     suggestion: true,
//   });
//   console.log("resSearch:", resSearch);

//   // const resSuggest = await wiki.suggest(query);
//   // console.log("resSuggest:", resSuggest);

//   return resSearch.results;
// }

const getUrlSuggest = (query) =>
  __minimizeUrl(`
  https://${appState.lang}.wikipedia.org/w/api.php
  ?action=opensearch
  &format=json
  &formatversion=2
  &search=${query}
  &namespace=0
  &limit=10
  &origin=*`);


const getUrlPageLinks = (query) => [
  `https://${appState.lang}.wikipedia.org/w/api.php`,
  // ------> https://www.mediawiki.org/wiki/API:Search_and_discovery#CirrusSearch
  // '?action=query',
  // '&list=search',
  // `&srsearch=morelike:${query}`,
  // '&srnamespace=0',
  // '&srlimit=20',
  // '&format=json',
  // '&formatversion=2',
  // '&origin=*&',

  // ------> https://www.mediawiki.org/wiki/API:Search_and_discovery#CirrusSearch
  // same but generator
  '?action=query',
  '&generator=search',
  `&gsrsearch=morelike:${query}`,
  '&gsrnamespace=0',
  '&gsrlimit=20',
  '&prop=extracts|pageimages|description|info',
  '&exintro=1',
  '&exlimit=20',
  '&piprop=original|thumbnail',
  '&pithumbsize=320',
  '&inprop=url',
  '&format=json',
  '&formatversion=2',
  '&origin=*&',
].join('')


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
  for (let i = 0; i < titles.length; i++) {
    const chunks = links[i].split("/")
    res.push({ title: titles[i], normalized: chunks[chunks.length - 1] });
  }

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
/**
 * 
 * from https://www.mediawiki.org/wiki/API:Links#See_also
 * API:Linkshere - API:Properties submodule that finds pages which include a link to the given page.
 * API:Backlinks - API:Lists submodule that gets a list of pages which link to a given page.
 * API:Iwlinks - Find interwiki links on a given page (i.e, meta pages, special pages).
 * API:Iwbacklinks - Get a list of pages which are linked from a given interwiki link.
 * 
*/
async function getLinksCustom(query) {
  const apiEndpoint = getUrlPageLinks(query);
  const linksResponse = (await (await fetch(apiEndpoint)).json()) as {
    batchcomplete: boolean
    continue: {sroffset: number, continue: '-||'}
    query: {
      search: {pageid: number; ns: number; title: string}[]
      searchinfo: {totalhits: 22, approximate_totalhits: true}
    }
  };

  console.log("🔥 linksResponse:", linksResponse);

  const pages = linksResponse.query.search

  // const pages = await Promise.all(
  //   linksResponse.query.search.map(p => getSummary(p.title))
  //   // linksResponse.query.backlinks.map(p => getSummary(p.title))
  //   // linksResponse.query.pages[pageid].links.map(p => getSummary(p.title))
  // )

  return pages
}

async function getSummary(query: string) {
  const endpoint = [
    `https://${appState.lang}.wikipedia.org/w/api.php`,
    '?action=query',
    `&titles=${query}`,
    '&prop=extracts|pageimages|description|info',
    '&exintro=1',
    '&exlimit=20',
    '&piprop=original|thumbnail',
    '&pithumbsize=320',
    '&inprop=url',
    '&format=json',
    '&formatversion=2',
    '&origin=*&',
    ].join('')

  const summary: ActionAPI_Summary_Response = await (await fetch(endpoint)).json();

  return summary.query.pages[0];
}

async function getResponse(query: string) {
  return getLinksCustom(query)
}

function getItem(item: ActionAPI_Summary) {
  const {
    description,
    pageid,
    extract,
    original,
    thumbnail,
    fullurl,
  } = item;

  const page_url = isMobile
    ? fullurl.replace('.wikipedia', '.m.wikipedia')
    : fullurl;

  const data = {
    description,
    pageid,
    extract_html: extract,
    originalimage: original,
    thumbnail,
    page_url,
  };

  return { id: item.title, data };
}

// ------------------------------------------------------------ //
//                          Languages                          //
// -----------------------------------------------------------//

// let languages = writable<languageResult[]>(null);

// // Note: here lang=en since the response is the same for any lang
// const loadLangsUrl = __minimizeUrl(`
// https://en.wikipedia.org/w/api.php
// ?meta=siteinfo
// &siprop=languages
// &format=json
// &redirects=
// &action=query
// &origin=*`);

// async function loadLangs() {
//   // if (languages) return;
//   // const langs = await wiki.languages();

//   const response = await fetch(loadLangsUrl);

//   if (!response.ok) return;

//   const langs = (await response.json()).query.languages as languageResult[];

//   languages.set(langs);
// }

function setLang(language: string) {
  // validation?

  restApiLang = language;
}

export const apiClient = {
  // suggest,
  // page,

  suggestCustom,
  getSummary,

  getResponse,
  getItem,

  // languages,
  // loadLangs,
  setLang,
};
