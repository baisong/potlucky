<script>
    import { enhance } from '$app/forms';
    import { getContext, setContext, onMount } from 'svelte';

    import { players, gifts, activePlayerId } from '$components/game.js';
    import { invalidate } from '$app/navigation';

    let highlighted = getContext('highlighted');

    export let player = {
        id: -1,
        name: 'Player',
        _id: -1
    };

    $: highlight = player._id == $activePlayerId;

    const handleClick = () => {
        console.log({ before: 1, player, activeId: $activePlayerId, highlighted: $highlighted, highlight: highlight });
        if (!highlight) {
            $highlighted = { [player._id]: true };
            $activePlayerId = player._id;
            highlight = highlight;
            // $gifts = $gifts;
            //$players = updateHighlighted($players, player, true);
        } else {
            $highlighted = {};
        }
        console.log({ after: 1, player, activeId: $activePlayerId, highlighted: $highlighted, highlight: highlight });
        highlight = highlight;
        //console.log($players);
    };

    if (player._id === $activePlayerId) {
        handleClick();
    }

    const submitDelPlayer = () => {
        return ({ result, update }) => {
            console.log({ result });
            if (result.type === 'success') {
                invalidate('app:potluck');
                //                console.log( { result, update } );
            } else {
                update();
            }
        };
    };
    /*
    // function updateHighlighted(arr, item, value) {
    //     let array = [...arr];
    //     if (typeof value === 'undefined') value = false;
    //     let findIndex;
    //     const found = array.some((a, index) => {
    //         findIndex = index;
    //         return a.id === item.id;
    //     });
    //     if (found) {
    //         let updatedItem = array[findIndex];
    //         console.log({ updatedItem, findIndex });
    //         updatedItem.highlighted = true;
    //         array = array
    //             .splice(findIndex, 1)
    //             .map((b) => {
    //                 return { ...b, highlighed: false };
    //             })
    //             .push(updatedItem);
    //     }
    //     return array;
    // }
    */
</script>

<div class="circle" class:highlight>
    <!-- <button>edit</button> -->
    <button class="label" on:click={() => handleClick()} on:keypress={() => handleClick()}>
        {player.name}
    </button>
    <form method="POST" action="?/delPlayer" use:enhance={submitDelPlayer}>
        <input type="hidden" name="_id" value={player._id} />
        <button>X</button>
    </form>
</div>

<style>
    .circle {
        background: #ddd;
        border-radius: 50%;
        height: 5em;
        width: 5em;
        border: 1px solid #bbb;
        display: flex;
        flex-direction: column;
    }
    .highlight {
        background-color: yellow;
        color: black;
        border-color: black;
    }
    .label {
        flex: 2;
    }
</style>
