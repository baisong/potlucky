<script>
    import { getContext, setContext, onMount } from 'svelte';

    import { players, gifts, activePlayerId } from '$components/game.js';

    const highlighted = getContext('highlighted');

    export let player = {
        id: -1,
        name: 'Player'
    };

    let id = Math.floor(Math.random() * Date.now());
    let highlight = false;

    $: highlight = $highlighted[id];

    function updateHighlighted(arr, item, value) {
        let array = [...arr];
        if (typeof value === 'undefined') value = false;
        let findIndex;
        const found = array.some((a, index) => {
            findIndex = index;
            return a.id === item.id;
        });
        if (found) {
            let updatedItem = array[findIndex];
            console.log({ updatedItem, findIndex });
            updatedItem.highlighted = true;
            array = array
                .splice(findIndex, 1)
                .map((b) => {
                    return { ...b, highlighed: false };
                })
                .push(updatedItem);
        }
        return array;
    }

    const handleClick = () => {
        if (!highlight) {
            highlight = true;
            $highlighted = { [id]: true };
            $activePlayerId = player.id;
            $gifts = $gifts;
            //$players = updateHighlighted($players, player, true);
        } else {
            highlight = false;
            $highlighted = {};
        }
        //console.log($players);
    };


    if (player.id === $activePlayerId) {
        handleClick();
    }
</script>

<button class:highlight on:click={handleClick}>
    {player.name}
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
