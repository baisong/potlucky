//import { players, gifts, $activePlayerId } from '$components/game.js';
import { players } from'$db/players';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function() {
    //console.log({ players });
    const data = await players
    .find({},{limit: 10})
    .project({_id: 0, name: 1, id: 1})
    .toArray();
    //console.log({data});
    return {
        potluck_players: data
    }
}

/** @type {import('./$types').Actions} */
export const actions: Actions = {
    newPlayer: async ({ cookies, request }) => {
        const data = await request.formData();
        const newPlayer = {
            name: data.get('name'),
            id: parseInt(data.get('id')?.toString() || '-1'),
        }
        const result = await players.insertOne(newPlayer);
        console.log({ success: result.acknowledged, newPlayer: newPlayer });
        //console.log(newPlayer);
        return {
            success: result.acknowledged,
            newPlayer: {
                id: newPlayer.id,
                name: newPlayer.name,
             }
        };
    },
    newGift: async ({ cookies, request }) => {
        const data = await request.formData();
        const newGift = {
            from: parseInt(data.get('from')?.toString() || '-1'),
            label: data.get('label'),
            id: parseInt(data.get('id')?.toString() || '-1'),
        }
        console.log(newGift);
        return { success: true, newGift: newGift };
    },
};