import buildGraph from "./buildGraph";
import Progress from "./Progress";
import queryState from "query-state";

let apiClient
let lastBuilder = null;

const qs = queryState(
  {
    query: ""
  },
  {
    useSearch: true
  }
);

const appStateFromQuery = qs.get();
// console.log('[appState] appStateFromQuery:', appStateFromQuery);

// TODO: state should be a Proxy
const appState = {
  hasGraph: false,
  maxDepth: appStateFromQuery.maxDepth || 2,
  progress: new Progress(),
  graph: null,
  query: appStateFromQuery.query,
};

qs.onChange(updateAppState);

function updateAppState(newState) {
  appState.query = newState.query;
}

function performSearch(queryString) {
  appState.hasGraph = true;
  appState.progress.reset();

  qs.set("query", queryString);
  if (lastBuilder) {
    lastBuilder.dispose();
  }

  console.log("apiClient:", apiClient);

  lastBuilder = buildGraph(
    queryString,
    apiClient.getResponse,
    apiClient.getItemId,
    appState.maxDepth,
    appState.progress
  );

  // appState.graph = Object.freeze(lastBuilder.graph);
  appState.graph = lastBuilder.graph;
  return lastBuilder.graph;
}

function setApiClient(value) {
  apiClient = value
}

export {
  appState,
  performSearch,
  setApiClient,
}

// if (appState.query) {
//   performSearch(appState.query);
// }
