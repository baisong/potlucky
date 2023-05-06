<script lang="ts">
    // @TODO
    // Add database table/functions for players
    // Add database table/functions for gifts
    // Add game IDs
    // Add database table/functions for games
    // Add welcome page w "new game" / "revive game" buttons
    // Add drag-and-drop wishlist zones (newoptions, wishlist, wishaway basket)
    // Create form action for exchange algorithm
    // Create UI for exchange directions for each player
    // Create yunohost app script
    // Create hot potato mode
    // Test offline browser storage saving

    // From Typescript PostCSS Template
    // https://github.com/JoshQuaintance/SvelteKit-Template
    import { enhance } from '$app/forms';
    import HighlightGroup from '$components/HighlightGroup.svelte';
    import Highlight from '$components/Highlight.svelte';

    import { players, gifts, wants, activePlayerId } from '$components/game.js';
    import PlayerItem from '$components/PlayerItem.svelte';
    import GiftItem from '$components/GiftItem.svelte';
    import WishItem from '$components/WishItem.svelte';
    import type { PageData } from './$types';
    import { invalidate } from '$app/navigation';

    export let data: PageData;

    function isActivePlayersGift(gift) {
        return gift && gift.from === $activePlayerId;
    }
    function notActivePlayersGift(gift) {
        //console.log({gift});
        return gift && gift.from !== $activePlayerId;
    }
    let newPlayerName = '';
    $: activePlayerName = potluck_players.filter((p) => p._id == $activePlayerId).length
        ? potluck_players.filter((p) => p._id == $activePlayerId)[0]?.name
        : 'Someone';
    $: newPlayerId =
        Math.max.apply(
            Math,
            potluck_players.map(function (o) {
                return o.id;
            })
        ) + 1;
    $: newGiftId =
        Math.max.apply(
            Math,
            potluck_gifts.map(function (o) {
                return o.id;
            })
        ) + 1;
    $: ({ potluck_players, potluck_gifts, potluck_wishes } = data);
    $: console.log({ potluck_players, potluck_gifts });

    const submitNewPlayer = () => {
        return ({ result, update }) => {
            if (result?.success) {
                console.log({ data: result.data, pass: parseInt(result.data.newPlayer.id) === newPlayerId });
                if (parseInt(result.data.newPlayer.id) === newPlayerId) {
                    //$players.push(result.data.newPlayer);
                    //$players = $players;
                    invalidate('app:potluck');
                    newPlayerName = '';
                    console.log({ potluck_players });
                }
                //                console.log( { result, update } );
            } else {
                update();
            }
        };
    };
    const submitNewGift = () => {
        return ({ result, update }) => {
            if (result.success) {
                console.log({ data: result.data, pass: parseInt(result.data.newGift.id) === newGiftId });
                if (parseInt(result.data.newGift.id) === newGiftId) {
                    //$gifts.push(result.data.newGift);
                    //$gifts = $gifts;
                    invalidate('app:potluck');
                    console.log({ potluck_gifts });
                }
                //                console.log( { result, update } );
            } else {
                update();
            }
        };
    };

    if ($activePlayerId == 0 && data?.potluck_players[0]?._id.length) {
        $activePlayerId = data?.potluck_players[0]._id;
    }

    $: activeGifts = data.potluck_gifts.length ? data.potluck_gifts.filter(isActivePlayersGift) : [];
    $: inactiveGifts = data.potluck_gifts.length ? data.potluck_gifts.filter(notActivePlayersGift) : [];
    
</script>

<svelte:head>
    <title>potluck</title>

    <meta
        name="description"
        content="An opinionated SvelteKit template complete with Tailwind, PlayWright, Vitest, and Husky pre-installed" />
</svelte:head>

<div
    class="container"
    on:click={() => console.log({ activePlayerId: $activePlayerId, activeGifts, allGifts: potluck_gifts })}
    on:keypress={() => console.log('Hello.')}>
    <span id="potluck" class="bg-clip-text bg-gradient-to-r text-transparent">potluck</span>
</div>

<main>
    <header>
        <h1>Players</h1>
        <p>Everyone who wants to give away some gifts!</p>
    </header>
    <section>
        <HighlightGroup>
            {#each potluck_players as player}
                <PlayerItem {player} />
            {/each}
        </HighlightGroup>
        <aside>
            <form method="POST" action="?/newPlayer" use:enhance={submitNewPlayer}>
                <label for="name"
                    >name
                    <input name="name" type="text" bind:value={newPlayerName} placeholder="new player" />
                    <input type="hidden" name="id" value={newPlayerId} />
                    <button>add</button>
                </label>
            </form>
        </aside>
    </section>
    <header>
        <h1>{activePlayerName}'s give-away basket</h1>
        <p>The gifts you want to give away to others</p>
    </header>
    <section>
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
    <header>
        <h1>{activePlayerName}'s new options</h1>
        <p>The gifts you might want to add to your wishlist, or not!</p>
    </header>
    <section>
        <!--
        <ul class="option-group">
            <li class="option-item">
                <label>
                    <input type="checkbox" name="show-other-wishes" />
                    Show others' wishes
                </label>
            </li>
            <li class="option-item">
                <label>
                    <input type="checkbox" name="show-wish-names" />
                    Show others' names
                </label>
            </li>
        </ul>
        -->
        <HighlightGroup>
            {#each inactiveGifts as wish}
                <WishItem {wish} />
            {/each}
        </HighlightGroup>
    </section>

    <header>
        <h1>{activePlayerName}'s wishlist</h1>
        <p>The gifts you would like to receive, in ranked order</p>
    </header>
    <section>
        <HighlightGroup>
            {#each inactiveGifts as wish}
                <WishItem {wish} />
            {/each}
        </HighlightGroup>
        <header>
            <h2>{activePlayerName}'s seen list</h2>
            <p>The gifts you've seen and don't want</p>
        </header>
        <section>
            <HighlightGroup>
                {#each inactiveGifts as wish}
                    <WishItem {wish} />
                {/each}
            </HighlightGroup>
        </section>
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
    #potluck {
        @apply from-green-500 via-indigo-500 to-[#FE5858];
    }
    /* 
    #tailwind {
        @apply cursor-pointer;
        @apply from-green-400 via-blue-500 to-indigo-500;
    } */
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
    p {
        color: #555;
        font-weight: 300;
        font-size: 0.9em;
    }
</style>
