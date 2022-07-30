import bus from "./bus";
import createGraph from "ngraph.graph";


/**
 * This function builds a graph from google's auto-suggestions.
 */
export default function buildGraph(entryItem, getResponse, getItem, MAX_DEPTH, progress) {
  console.log(
    "🚀 buildGraph: entryItem, MAX_DEPTH, progress",
    entryItem,
    MAX_DEPTH,
    progress
  );

  // empty item
  if (!entryItem) return;

  // empty item.id
  entryItem.id = entryItem.id && entryItem.id.trim();
  if (!entryItem.id) return;

  let cancelled = false;
  let pendingResponse;
  let graph = createGraph();
  graph.maxDepth = MAX_DEPTH;
  let queue = [];
  let requestDelay = 300 + Math.random() * 100;
  progress.startDownload();

  startQueryConstruction();

  return {
    dispose,
    graph
  };

  function dispose() {
    cancelled = true;
    if (pendingResponse) {
      // TODO: uncomment this and stick with cancelable promises
      // pendingResponse.cancel();
      pendingResponse = null;
    }
  }

  function startQueryConstruction() {
    graph.addNode(entryItem.id, { depth: 0, ...entryItem.data });
    fetchNext(entryItem.id);
  }

  function loadSiblings(parent, results) {
    var parentNode = graph.getNode(parent);

    if (!parentNode) {
      throw new Error("Parent is missing for " + parent);
    }

    results.forEach(r => {
      const other = getItem(r)

      const hasOtherNode = graph.hasNode(other.id);
      const hasOtherLink =
        graph.getLink(other.id, parent) || graph.getLink(parent, other.id);
      if (hasOtherNode) {
        if (!hasOtherLink) {
          graph.addLink(parent, other.id);
        }
        return;
      }

      let depth = parentNode.data.depth + 1;
      graph.addNode(other.id, { depth, ...other.data });
      graph.addLink(parent, other.id);
      if (depth < MAX_DEPTH) queue.push(other.id);
    });

    setTimeout(loadNext, requestDelay);
  }

  function loadNext() {
    if (cancelled) return;
    if (queue.length === 0) {
      bus.fire("graph-ready", graph);
      return;
    }

    while (queue.length > 0) {
      let nextWord = queue.shift();
      fetchNext(nextWord);
      progress.updateLayout(queue.length, nextWord);
    }
  }

  function fetchNext(query) {
    pendingResponse = getResponse(query);

    pendingResponse
      .then(res => onPendingReady(res, query))
      .catch(msg => {
        const err = "Failed to download " + query + "; Message: " + msg;
        console.error(err);
        progress.downloadError(err);
        loadNext();
      });
  }

  function onPendingReady(res, query) {
    if (res.length === 0) {
      console.warn("[onPendingReady] Got empty [] result! query:", query);
      throw Error("got empty result []!");
    }

    loadSiblings(query, res);
  }
}
