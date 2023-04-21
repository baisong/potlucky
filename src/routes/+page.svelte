<script lang="ts">
    // From Typescript PostCSS Template
    // https://github.com/JoshQuaintance/SvelteKit-Template
    import { enhance } from '$app/forms';
    import HighlightGroup from '$components/HighlightGroup.svelte';
    import Highlight from '$components/Highlight.svelte';

    import { players, gifts, activePlayerId } from '$components/game.js';
    import PlayerItem from '$components/PlayerItem.svelte';
    import GiftItem from '$components/GiftItem.svelte';
    import WantItem from '$components/WantItem.svelte';

    function isActivePlayersGift(gift) {
        return gift && gift.from === $activePlayerId;
    }
    function notActivePlayersGift(gift) {
        return gift && gift.from !== $activePlayerId;
    }
    $: activeGifts = $gifts.length ? $gifts.filter(isActivePlayersGift) : [];
    $: inactiveGifts = $gifts.length ? $gifts.filter(notActivePlayersGift) : [];
    let newPlayerName = '';
    $: activePlayerName = $players.filter(p => p.id == $activePlayerId).length ? $players.filter(p => p.id == $activePlayerId)[0].name : "Someone";
    $: newPlayerId =
        Math.max.apply(
            Math,
            $players.map(function (o) {
                return o.id;
            })
        ) + 1;
    $: newGiftId =
        Math.max.apply(
            Math,
            $gifts.map(function (o) {
                return o.id;
            })
        ) + 1;
    $: console.log($players);

    const submitNewPlayer = () => {
        return ({ result, update }) => {
            if (result.type === 'success') {
                console.log({ data: result.data, pass: parseInt(result.data.newPlayer.id) === newPlayerId });
                if (parseInt(result.data.newPlayer.id) === newPlayerId) {
                    $players.push(result.data.newPlayer);
                    $players = $players;
                    newPlayerName = '';
                    console.log({ players: $players });
                }
                //                console.log( { result, update } );
            } else {
                update();
            }
        };
    };
    const submitNewGift = () => {
        return ({ result, update }) => {
            if (result.type === 'success') {
                console.log({ data: result.data, pass: parseInt(result.data.newGift.id) === newGiftId });
                if (parseInt(result.data.newGift.id) === newGiftId) {
                    $gifts.push(result.data.newGift);
                    $gifts = $gifts;
                    console.log({ gifts: $gifts });
                }
                //                console.log( { result, update } );
            } else {
                update();
            }
        };
    };
</script>

<svelte:head>
    <title>potluck</title>

    <meta
        name="description"
        content="An opinionated SvelteKit template complete with Tailwind, PlayWright, Vitest, and Husky pre-installed" />
</svelte:head>

<div
    class="container"
    on:click={() =>
        console.log({ activePlayerId: $activePlayerId, activeGifts, allGifts: $gifts })}>
    <span id="potluck" class="bg-clip-text bg-gradient-to-r text-transparent">potluck</span>
</div>

<main>
    <section>
        <h1>players</h1>
        <HighlightGroup>
            {#each $players as player}
                <PlayerItem {player} />
            {/each}
        </HighlightGroup>
        <aside>
            <form method="POST" action="?/newPlayer" use:enhance={submitNewPlayer}>
                <label for="name"
                    >name
                    <input name="name" type="text" bind:value="{newPlayerName}" placeholder="new player" />
                    <input type="hidden" name="id" value={newPlayerId} />
                    <button>add</button>
                </label>
            </form>
        </aside>
    </section>
    <section>
        <h1>{activePlayerName}'s gifts</h1>
        <HighlightGroup>
            {#each activeGifts as gift}
                <GiftItem {gift} />
            {/each}
        </HighlightGroup>
        <aside>
            <form method="POST" action="?/newGift" use:enhance={submitNewGift}>
                <label
                    >label
                    <input type="text" name="label" placeholder="new gift" />
                    <input type="hidden" name="id" value={newGiftId} />
                    <input type="hidden" name="from" value={$activePlayerId} />
                    <button>add</button>
                </label>
            </form>
        </aside>
    </section>
    <section>
        <h1>{activePlayerName}'s wants</h1>
        <HighlightGroup>
            {#each inactiveGifts as want}
                <WantItem {want} />
            {/each}
        </HighlightGroup>
        <aside>
            <form method="POST" action="?/newGift" use:enhance={submitNewGift}>
                <label
                    >label
                    <input type="text" name="label" placeholder="new gift" />
                    <input type="hidden" name="id" value={newGiftId} />
                    <input type="hidden" name="from" value={$activePlayerId} />
                    <button>add</button>
                </label>
            </form>
        </aside>
    </section>
</main>

<style lang="postcss">
    .container {
        max-width: 100%;
        margin: 1em 0;
        text-align: center;
        font-size: 2em;
        font-weight: bold;
    }
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
    }
    #potluck {
        @apply from-green-500 via-indigo-500 to-[#FE5858];
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
