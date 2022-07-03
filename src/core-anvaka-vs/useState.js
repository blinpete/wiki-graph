import buildGraph from "./buildGraph";
import Progress from "./Progress";

export function useState(apiClient) {
  const queryState = require("query-state");
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


  if (appState.query) {
    performSearch(appState.query);
  }


  qs.onChange(updateAppState);

  function updateAppState(newState) {
    appState.query = newState.query;
  }


  let lastBuilder;

  function performSearch(queryString) {
    appState.hasGraph = true;
    appState.progress.reset();

    qs.set("query", queryString);
    if (lastBuilder) {
      lastBuilder.dispose();
    }

    console.log("apiClient:", apiClient);

    lastBuilder = buildGraph(queryString, apiClient.getResponse, appState.maxDepth, appState.progress);

    appState.graph = Object.freeze(lastBuilder.graph);
    return lastBuilder.graph;
  }


  return { appState, performSearch }
}  
