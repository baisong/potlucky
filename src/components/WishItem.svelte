<script>
    import { getContext, setContext, onMount } from 'svelte';

    import { gifts, players, activePlayerId } from '$components/game.js';

    const highlighted = getContext('highlighted');

    export let wish = {
        id: -1,
        label: 'Wish'
    };

    let id = Math.floor(Math.random() * Date.now());
    let highlight = false;

    $: highlight = $highlighted[id];

    const handleClick = () => {
        console.log(wish);
        if (!highlight) {
            highlight = true;
            $highlighted = { [id]: true };
            //$players = updateHighlighted($players, player, true);
        } else {
            highlight = false;
            $highlighted = {};
        }
        //console.log($players);
    };

    const weighInOn = (playerWishes) => {
        if (typeof playerWishes === "undefined") playerWishes = true;
    }
</script>

<ul class="item-container">
    <li>
        <button class="mini-button" on:click={weighInOn}>yes</button>
    </li>
    <li>
        <button class:highlight on:click={handleClick}>
            {wish.label}
        </button>
    </li>
    <li>
        <button class="mini-button" on:click={() => weighInOn(false)}>no</button>
    </li>
</ul>

<style>
    .highlight {
        background-color: yellow;
        color: black;
        border-color: black;
    }
    .item-container {
        background: #ddd;
        border-radius: 50%;
        height: 5em;
        width: 5em;
        border: 1px solid #bbb;
        display: flex;
        flex-direction: column;
    }
    .item-container li {
        flex: 1;
    }
</style>
