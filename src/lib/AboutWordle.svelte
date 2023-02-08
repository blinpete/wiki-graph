<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const emit = createEventDispatcher<{hide: void}>()
  
  import { appState } from "./state";

  type Langs = 'en' | 'ru'
  // let currentLang: Langs = appState.lang === 'ru' ? 'ru' : 'en'
  let currentLang: Langs = 'en'

  type Description = {
    descShort: string
    desc: string
    desc2: string
    inspiredBy: string
    descTechnical: string
    notes: string[]
    usage: string
    enjoy: string

    node: { name: string; role: string}
    edge: { name: string; role: string}
    nodeClick: { name: string; role: string}
    nodeHover: { name: string; role: string}
  }

  const text: Record<Langs, Description> = {
    en: {
      descShort: "have fun turning your knowledge into a game",
      desc: "This mode turns Wiki Graph into a quiz game. The original idea belongs to",
      desc2: "For more details see this",
      inspiredBy: "comment on Reddit",
      descTechnical: "In Wordle mode:",
      notes: [
        "Left click on a node toggles visibility, you can no longer open full articles",
        "Wiki Graph never shows a popup for hidden nodes, so you are safe to move your mouse over",
        "Wiki Graph never reveals hidden nodes accidentally, even when a graph is not yet completed. So the page refresh won't break your game",
        "Wiki Graph keeps your Wordle setup in the URL, so that you can share a link to open the page on another device"
      ],
      usage: "Rules? There are no any particular rules you have to follow apart from having fun! Just turn Wordle mode on, hide some nodes and you are good to go.",
      enjoy: "Ok, here's your first wiki game!",

      node: {name: 'Node', role: 'represents a wiki article'},
      edge: {name: 'Edge', role: 'represents a relation between two articles'},
      nodeClick: {name: 'Node click', role: 'hides/reveals the node name'},
      nodeHover: {name: 'Node hover', role: 'shows the article preview in a small popup'},
    },
    // ru: {
    // },
  }

  function handleEsc(e: KeyboardEvent) {
    if (e.key === 'Escape') emit('hide')
  }
</script>

<svelte:window on:keydown={handleEsc} />

<article class="about" on:click={() => emit('hide')}>
  <div class="about-container" on:click={e => e.stopPropagation()}>

    <section class="main">
  
      <h1 class="title">Wiki Graph: Wordle mode</h1>
      <button class="btn-close" on:click={() => emit('hide')}>Esc</button>
  
      {#key currentLang}
        <p class="tiny-note">{text[currentLang].descShort}</p>
  
        <p>
          {text[currentLang].desc}
          <a href="https://www.reddit.com/user/MrMitchWeaver/" target="_blank" rel="noopener noreferrer">MrMitchWeaver</a>.
          
          {text[currentLang].desc2}
          <a href="https://www.reddit.com/r/dataisbeautiful/comments/10tj7cq/comment/j78i7z6/?utm_source=share&utm_medium=web2x&context=3" target="_blank" rel="noopener noreferrer">{text[currentLang].inspiredBy}</a>.
        </p>
  
        <p>{text[currentLang].descTechnical}</p>
  
        <ul>
          {#each text[currentLang].notes as note}
            <li>{note}</li>
          {/each}
        </ul>

        <p>{text[currentLang].usage}</p>

        <p class="p-last footnote">
           Ok, here's <a href="https://blinpete.github.io/wiki-graph/?lang=en&maxDepth=2&wordle=909036-true&query=Elon%20Musk" target="_blank" rel="noopener noreferrer">your first wiki game</a>!
          
          <!-- {text[currentLang].enjoy}
          <br>
          <code>
            <a href="https://github.com/blinpete" target="_blank" rel="noopener noreferrer">blinpete</a>
          </code> -->
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
          <ul class="hints">
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
    padding-left: 1.5em;
  }

  
  ul.hints {
    padding-left: 1em;
    
    padding-left: 0;
    list-style: none;
  
    & li:nth-child(3) strong {
      text-decoration: underline solid 1.4px;

      /* position: relative;
      &::before {
        content: "·";
        position: absolute;
        left: -0.6em;
        transform: scale(1.8);
      } */
    }

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
