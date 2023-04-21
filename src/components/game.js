import { writable } from 'svelte/store';

export let players = writable([
    {name: 'Kev', id: 0},
    {name: 'J\'Nyka', id: 1},
    {name: 'Oren', id: 2}
]);

export let gifts = writable({
    0: [{name: 'banana'},{name: 'tomato'}],
    1: [{name: 'beet chips'}],
    2: [{name: 'cookies'}],
});

export let activePlayerId = writable(0);