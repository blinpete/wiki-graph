<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const emit = createEventDispatcher<{hide: void}>()
  
  import { appState } from "./state";

  type Langs = 'en' | 'ru'
  let currentLang: Langs = appState.lang === 'ru' ? 'ru' : 'en'

  type Description = {
    descShort: string
    desc: string
    descTechnical: string
    inspiredBy: string
    checkOut: string
    enjoy: string

    node: { name: string; role: string}
    edge: { name: string; role: string}
    nodeClick: { name: string; role: string}
    nodeHover: { name: string; role: string}
  }

  const text: Record<Langs, Description> = {
    en: {
      descShort: "a graph client for Wikipedia",
      desc: "Wiki Graph gets your query and takes two steps further to show you the bigger picture of what you're searching for. This way you can see related topics as well as connections between them.",
      descTechnical: "It starts with a wiki article you give, collects top 20 related articles, then for each one collects their top 20 and finally draws a graph of everything that's found.",
      inspiredBy: "This was heavily inspired by",
      checkOut: " so check out his project",
      enjoy: "Enjoy diving into knowledge",

      node: {name: 'Node', role: 'represents a wiki article'},
      edge: {name: 'Edge', role: 'represents a relation between two articles'},
      nodeClick: {name: 'Node click', role: 'opens the article in a new tab'},
      nodeHover: {name: 'Node hover', role: 'shows the article preview in a small popup'},
    },
    ru: {
      descShort: "граф клиент для Википедии",
      desc: "Wiki Graph принимает запрос и проходит на два шага вперед, чтобы показать более полную картину поиска. Так можно увидеть смежные темы и связи между ними.",
      descTechnical: "Начиная с выбранной вики статьи, алгоритм собирает топ 20 смежных статей, потом для каждой из них собирает ее топ 20 и наконец рисует граф из всего, что найдено.",
      inspiredBy: "Работа вдохновлена проектом",
      checkOut: " и основана на его движке",
      enjoy: "Ну все, развлекайтесь и ботайте",

      node: {name: 'Узел', role: 'это вики-статья'},
      edge: {name: 'Ребро', role: 'показывает связь между двумя статьями'},
      nodeClick: {name: 'Клик по узелу', role: 'открывает статью в новой вкладке'},
      nodeHover: {name: 'Наведение на узел', role: 'показывает превьюшку статьи'},
    },
  }

  function handleEsc(e: KeyboardEvent) {
    if (e.key === 'Escape') emit('hide')
  }
</script>

<svelte:window on:keydown={handleEsc} />

<article class="about" on:click={() => emit('hide')}>
  <div class="about-container" on:click={e => e.stopPropagation()}>

    <section class="main">
  
      <h1 class="title">Wiki Graph</h1>
      <button class="btn-close" on:click={() => emit('hide')}>Esc</button>
  
      {#key currentLang}
        <p class="tiny-note">{text[currentLang].descShort}</p>
  
        <p>{text[currentLang].desc}</p>
  
        <p>{text[currentLang].descTechnical}</p>
  
        <div class="inspiration">
          {text[currentLang].inspiredBy} <span> anvaka's <a href="https://anvaka.github.io/vs/?query=" target="_blank" rel="noopener noreferrer">vs-autocomplete</a>{text[currentLang].checkOut}.</span>
        </div>
  
        <p class="p-last footnote">
          {text[currentLang].enjoy},<br>
          <code>
            <a href="https://github.com/blinpete" target="_blank" rel="noopener noreferrer">blinpete</a>
          </code>
        </p>

        <!-- <div class="footnote">
          <code>Made by a wiki lover for wiki lovers</code>
        </div> -->
      {/key}
    </section>

    <section class="side">
      <div class="features">
        {#key currentLang}
          <!-- <h3>Quick guide</h3> -->
          <ul>
            <li><strong>{text[currentLang].node.name}</strong> {text[currentLang].node.role}.</li>
            <li><strong>{text[currentLang].edge.name}</strong> {text[currentLang].edge.role}.</li>
            <li><strong>{text[currentLang].nodeClick.name}</strong> {text[currentLang].nodeClick.role}.</li>
            <li><strong>{text[currentLang].nodeHover.name}</strong> {text[currentLang].nodeHover.role}.</li>
          </ul>
        {/key}
      </div>
    </section>
  </div>
</article>

<style lang="postcss">
  .about {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow-y: auto;

    cursor: pointer;

    background-color: var(--c-bg-outside);

    --c-bg-outside: hsl(342deg 10% 65% / 50%);
    --c-bg-outside-muted: hsl(0deg 26% 96%);
    --c-bg-outside-muted-text: hsl(0, 0%, 50%);

    --c-bg-inside: hsl(0, 33%, 98%);
    --c-bg-inside-text: hsl(0deg 1% 32%);
    --c-bg-inside-muted: hsl(0,2%,75%);
    /* --c-bg-inside-muted: hsl(0,8%,78%); */

  }
  
  .about-container {
    position: relative;

    max-width: clamp(200px, 80%, 600px);
    margin: 5em auto;


    border-radius: 0.4em;

    cursor: default;

    background-color: var(--c-bg-inside);
    color: var(--c-bg-inside-text);

    line-height: 1.3;

    & section {
      padding: 2em 5em;

      &.main {
        padding-bottom: 0;
      }
      
      &.side {
        padding-top: 0.8em;
        padding-bottom: 0.8em;

        background-color: var(--c-bg-outside-muted);
        color: var(--c-bg-outside-muted-text);

        border-radius: inherit;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
      
    }
  }

  .title {
    font-size: 1.5em;
    margin-top: 0.5em;
  }


  .footer, .p-last {
    margin-top: 2.5em;
  }

  .footnote {
    margin-top: 1.5em;
    margin-bottom: 2em;
    /* color: var(--c-bg-inside-muted); */
  }

  .inspiration {
    margin-top: 1em;

  }

  ul {
    padding-left: 1em;
    
    padding-left: 0;
    list-style: none;
  }

  .title {
    margin-bottom: 0;
  }

  .tiny-note {
    color: hsl(0,2%,75%);
    margin-top: 0;
    font-size: 0.9em;

    margin-bottom: 2em;
  }

  .btn-close {
    position: absolute;
    top: 1.5em;
    right: 1.5em;

    color: hsl(0deg 4% 41%);
    background-color: hsl(0deg 20% 93%);

    border-radius: 50%;
    border: 0;

    --size: 3em;
    width: var(--size);
    height: var(--size);

    cursor: pointer;

    &:hover {
      opacity: 0.85;
    }

  }
</style>
