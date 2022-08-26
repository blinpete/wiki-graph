import buildGraph from "./buildGraph";
import Progress from "./Progress";
import queryState from "query-state";

let lastBuilder = null;


export function useState(apiClient, extraState) {

  const qs = queryState(
    {
      ...extraState,
      query: "",
    },
    {
      useSearch: true
    }
  );

  const appStateFromQuery = qs.get();
  console.log('[appState] appStateFromQuery:', appStateFromQuery);

  let watchers = new Set()

  /**
   * 
   * Adds a watcher which gets called on `appState` change.
   * 
   * @param f `(target: appState, prop: keyof typeof appState, val: (typeof appState)[string]) => any`
   */
  function watchState(f) {
    watchers.add(f)
    return () => watchers.delete(f)
  }

  function unwatchState() {
    watchers.clear()
  }


  function wrapWithProxy(obj) {

    // dive
    for (const k in obj) {
      if (typeof obj[k] === 'object' && obj[k] != null) {
        obj[k] = wrapWithProxy(obj[k])
      }
    }

    return new Proxy(
      obj,
      {
        set(target, prop, val, receiver) {
          watchers.forEach(f => f(target, prop, val))

          console.log('[Proxy:appState] prop,val:', prop, val);

          if (Object.prototype.hasOwnProperty.call(appStateFromQuery, prop)) {
            qs.set(prop, val)
          }

          return Reflect.set(target, prop, val, receiver)
        }
      }
    )
  }

  const appState = wrapWithProxy({
    hasGraph: false,
    progress: new Progress(),
    graph: null,
    ...appStateFromQuery
  });

  if (!appState.maxDepth) {
    appState.maxDepth = 1
  }

  qs.onChange(updateAppState);
  console.log('[] qs = ', qs);

  function updateAppState(newState) {
    // TODO: does it work?
    appState.query = newState.query;
  }

  function performSearch(entryItem) {
    console.log("🚀 ~ performSearch ~ entryItem:", entryItem)

    appState.hasGraph = true;
    appState.progress.reset();

    qs.set("query", entryItem.id);
    if (lastBuilder) {
      lastBuilder.dispose();
    }

    lastBuilder = buildGraph(
      entryItem,
      apiClient.getResponse,
      apiClient.getItem,
      appState.maxDepth,
      appState.progress
    );

    // appState.graph = Object.freeze(lastBuilder.graph);
    appState.graph = lastBuilder.graph;
    return lastBuilder.graph;
  }

  return {
    qs,
    appState,
    performSearch,
    watchState,
    unwatchState,
  }
}
