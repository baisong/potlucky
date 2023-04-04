import { writable, get } from "svelte/store";

// @TODO
// Follow up and add svelte UI for the following actions
// https://www.youtube.com/watch?v=4soqks5zBLI
// Source:
// 1. Start with dummy data
// https://github.com/coopercodes/SvelteKitTypeScriptCodeSnippetProject/blob/main/src/routes/%2Bpage.ts
// 2. Build interface with add form
// https://github.com/coopercodes/SvelteKitTypeScriptCodeSnippetProject/blob/main/src/routes/%2Bpage.svelte

export const playerStore = writable<Player[]>([]);

export function addPlayer(input: PlayerInput) {
    let players = get(playerStore);
    const newPlayer = { ...input, active: true, color: "red", abbr: input.name};
    playerStore.update(() => {
        return players.map((player) => { return { ...player, active: false }});
    });
    playerStore.update(() => {
        return [ { ...newPlayer } , ...players]
    });
}

export function removePlayer(index: number) {
    let players = get(playerStore);
    players.splice(index, 1);
    playerStore.update(() => {
        return players;
    });
}

export function toggleActive(index: number) {
    let players = get(playerStore);
    playerStore.update(() => {
        return players.map((player, playerIndex) => {
            if(playerIndex === index) {
                return { ...player, active: true }
            }
            return { ...player, active: false };
        });
    });
}