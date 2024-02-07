# Wiki Graph

A graph view for [Wikipedia](https://www.wikipedia.org/). This is heavily based on [vs](https://github.com/anvaka/vs).

Try it [here](https://blinpete.github.io/wiki-graph/?lang=en&query=Erwin%20Schr%C3%B6dinger).

Read more in [this post on Reddit](https://www.reddit.com/r/dataisbeautiful/comments/10tj7cq/graph_view_for_wikipedia_articles_details_in_the/).

Inspired by

- anvaka's [vs-autocomplete](https://anvaka.github.io/vs/?query=)
- arifr1234's [wikipedia-graph](https://arifr1234.github.io/wikipedia-graph/)
- batou's [wikipedia-explorer](https://www.producthunt.com/products/explorer-explore-human-knowledge)
- this post on [Game of Thrones graph](https://blog.miz.space/research/2019/06/05/wikipedia-graph-dataset-neo4j-mongodb-time-series-networks/)

Note on APIs:

- autocomplete uses [MediaWiki Action API](https://www.mediawiki.org/wiki/API:Main_page)
- edges represent relations in terms of this [method](https://en.wikipedia.org/api/rest_v1/#/Page%20content/getRelatedPages) (Wikimedia REST API)

## License

[MIT](./LICENSE) License © 2022 [Peter Blinov](https://github.com/blinpete)
