import { writable } from 'svelte/store';

export let players = writable([
    {name: 'Kev', id: 0},
    {name: 'J\'Nyka', id: 1},
    {name: 'Oren', id: 2}
]);

export let gifts = writable([
    {id: 0, label: 'banana', from: 0},
    {id: 1, label: 'tomato', from: 0},
    {id: 2, label: 'beet chips', from: 1},
    {id: 3, label: 'cookies', from: 2},
]);

export let wants = writable([
    {gift: 0, from: 0, to: 1, weight: 5},
    {gift: 1, from: 0, to: 2, weight: 4},
    {gift: 2, from: 1, to: 0, weight: 3},
    {gift: 3, from: 2, to: 1, weight: 2},
]);

export let activePlayerId = writable(0);