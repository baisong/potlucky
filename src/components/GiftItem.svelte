<script>
    import { getContext, setContext, onMount } from 'svelte';

    import { gifts, players, activePlayerId } from '$components/game.js';

    const highlighted = getContext('highlighted');

    export let gift = {
        id: -1,
        label: 'Gift'
    };

    let id = Math.floor(Math.random() * Date.now());
    let highlight = false;

    $: highlight = $highlighted[id];

    const handleClick = () => {
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
</script>

<button class:highlight on:click={handleClick}>
    {gift.label}
</button>

<style>
    .highlight {
        background-color: yellow;
        color: black;
        border-color: black;
    }
    button {
        background: #ddd;
        border-radius: 50%;
        height: 5em;
        width: 5em;
        border: 1px solid #bbb;
    }
</style>
