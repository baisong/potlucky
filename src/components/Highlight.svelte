<script>
    import { getContext, onMount } from 'svelte';
	//import {players, gifts}

    const highlighted = getContext('highlighted');

    export let entity = {
        name: 'Player'
    };

    let id = Math.floor(Math.random() * Date.now());
    let highlight = false;

    onMount(() => {
        if (entity.highlighted === true) {
            handleClick();
        }
    });

    $: highlight = $highlighted[id];

    const handleClick = () => {
        if (!highlight) {
            highlight = true;
            $highlighted = { [id]: true };
        } else {
            highlight = false;
            $highlighted = {};
        }
    };
</script>

<button class:highlight on:click={handleClick}>
    {entity.name}
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
