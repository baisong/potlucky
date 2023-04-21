import { players, gifts, $activePlayerId } from '$components/game.js';

/** @type {import('./$types').Actions} */
export const actions = {
    newPlayer: async ({ cookies, request }) => {
        const data = await request.formData();
        const newPlayer = {
            name: data.get('name'),
            id: parseInt(data.get('id')),
        }
        //console.log(newPlayer);
        return { success: true, newPlayer: newPlayer };
    },
    newGift: async ({ cookies, request }) => {
        const data = await request.formData();
        const newGift = {
            from: parseInt(data.get('from')),
            label: data.get('label'),
            id: parseInt(data.get('id')),
        }
        console.log(newGift);
        return { success: true, newGift: newGift };
    },
};