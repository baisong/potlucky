<script lang="ts">
    import HighlightGroup from '$components/HighlightGroup.svelte';
    // From Typescript PostCSS Template
    // https://github.com/JoshQuaintance/SvelteKit-Template
    import Highlight from '$components/Highlight.svelte';

    import { players, gifts, activePlayerId } from '$components/game.js';
    import PlayerItem from '$components/PlayerItem.svelte';
    import { enhance } from '$app/forms';

    $: activeGifts = $gifts[$activePlayerId]?.length ? $gifts[$activePlayerId] : [];
    $: newPlayerId =
        Math.max.apply(
            Math,
            $players.map(function (o) {
                return o.id;
            })
        ) + 1;
    $: console.log($players);

    const onSubmit = () => {
        return ({ result, update }) => {
            if (result.type === 'success') {
                console.log({ data: result.data, pass: parseInt(result.data.newPlayer.id) === newPlayerId });
                if (parseInt(result.data.newPlayer.id) === newPlayerId) {
                    $players.push(result.data.newPlayer);
                    $players = $players;
                    console.log ({players: $players});
                }
                //                console.log( { result, update } );
            } else {
                update();
            }
        };
    };
</script>

<svelte:head>
    <title>Potluck</title>

    <meta
        name="description"
        content="An opinionated SvelteKit template complete with Tailwind, PlayWright, Vitest, and Husky pre-installed" />
</svelte:head>

<div class="container">
    <span
        on:click={() => console.log({ activePlayerId, activeGifts, allGifts: $gifts, gifts: $gifts[activePlayerId] })}
        class="font-bold"
        id="techStack">
        Potluck
        <a href="https://kit.svelte.dev" target="_blank" rel="noreferrer">
            <span id="sveltekit" class="bg-clip-text bg-gradient-to-r text-transparent">SvelteKit</span>
        </a>
    </span>
</div>

<main>
    <section>
        <h1>Players</h1>
        <HighlightGroup>
            {#each $players as player}
                <PlayerItem {player} />
            {/each}
        </HighlightGroup>
        <aside>
            <form method="POST" action="?/newPlayer" use:enhance={onSubmit}>
                <label for="name"
                    >name
                    <input name="name" type="text" placeholder="new player" />
                    <input type="hidden" name="id" value={newPlayerId} />
                    <button>add</button>
                </label>
            </form>
        </aside>
    </section>
    <section>
        <h1>Gifts</h1>
        <HighlightGroup>
            {#each activeGifts as gift}
                <Highlight entity={gift} />
            {/each}
        </HighlightGroup>
        <aside>
            <form>
                <label
                    >label
                    <input type="text" placeholder="new gift" />
                    <button>add</button>
                </label>
            </form>
        </aside>
    </section>
</main>

<style lang="postcss">
    main {
        text-align: center;
        display: flex;
        flex-direction: column;
    }
    aside {
        float: left;
        text-align: center;
    }
    #techStack {
        font-size: 2em;
    }
    #sveltekit {
        @apply cursor-pointer;
        @apply from-[#FE5858] via-[#FC9842] to-[#eb9927];
    }

    #tailwind {
        @apply cursor-pointer;
        @apply from-green-400 via-blue-500 to-indigo-500;
    }
    h1 {
        background: #ddd;
    }
    input {
        border: 1px solid lightgray;
    }
    form {
        margin: 0px auto 1em;
        margin-bottom: 1em;
    }
    section {
        display: flex;
        flex-direction: column;
    }
    button {
        background: #eee;
        padding: 0 0.5em;
        border: 1px solid lightgray;
    }
</style>
