import { players, gifts, $activePlayerId } from '$components/game.js';

/** @type {import('./$types').Actions} */
export const actions = {
    newPlayer: async ({ cookies, request }) => {
        const data = await request.formData();
        const newPlayer = {
            name: data.get('name'),
            id: data.get('id'),
        }
        console.log(newPlayer);
        return { success: true, newPlayer: newPlayer };
    },
};