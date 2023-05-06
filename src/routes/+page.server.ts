//import { players, gifts, $activePlayerId } from '$components/game.js';
import { games } from '$db/games';
import { players } from '$db/players';
import { gifts } from '$db/gifts';
import { wishes } from '$db/wishes';
import { ObjectId } from 'mongodb';

import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async function ({ depends }) {
    const raw_games = await games.find({}, { limit: 100 })
    .project({ _id: 1, name: 1, id: 1 })
    .toArray();
    const transformed_games = raw_games.map(p => {
        return { name: p.name, id: p.id, _id: p._id.toString()}
    });


    const raw_players = await players.find({}, { limit: 100 })
    .project({ _id: 1, name: 1, id: 1 })
    .toArray();
    const transformed_players = raw_players.map(p => {
        return { name: p.name, id: p.id, _id: p._id.toString()}
    });

    const raw_gifts = await gifts.find({}, { limit: 10 })
    .project({ _id: 1, from: 1, label: 1, id: 1 })
    .toArray();
    const transformed_gifts = raw_gifts.map(p => {
        return { label: p.label, from: p.from, _id: p._id.toString()}
    });

    const raw_wishes = await wishes.find({}, { limit: 10 })
    .project({ _id: 1, name: 1, id: 1 })
    .toArray();
    const transformed_wishes = raw_wishes.map(p => {
        return { name: p.name, id: p.id, _id: p._id.toString()}
    });


    depends('app:potluck');
    return {
        potluck_games: transformed_games,
        potluck_players: transformed_players,
        potluck_gifts: transformed_gifts,
        potluck_wishes: transformed_wishes,
    };
};

/** @type {import('./$types').Actions} */
export const actions: Actions = {
    newPlayer: async ({ cookies, request }) => {
        const data = await request.formData();
        const newPlayer = {
            name: data.get('name'),
            id: parseInt(data.get('id')?.toString() || '-1')
        };
        const result = await players.insertOne(newPlayer);
        //console.log({ success: result.acknowledged, newPlayer: newPlayer });
        const response = {
            success: result.acknowledged,
            newPlayer: {
                //id: newPlayer.id,
                _id: newPlayer?._id.toString(),
                name: newPlayer.name
            }
        };
        //console.log({ response });
        return response;
    },
    delPlayer: async ({ cookies, request }) => {
        const data = await request.formData();
        const delQuery = {
            _id: new ObjectId(data.get('_id')),
        }
        console.log({delQuery})
        const result = await players.deleteOne(delQuery);
        return result;
    },
    newGift: async ({ cookies, request }) => {
        const data = await request.formData();
        const newGift = {
            from: data.get('from')?.toString() || '-1',
            label: data.get('label'),
            //id: parseInt(data.get('id')?.toString() || '-1')
        };
        const result = await gifts.insertOne(newGift);
        const response = {
            success: result.acknowledged,
            newGift: {
                //id: newPlayer.id,
                _id: newGift?._id.toString(),
                label: newGift.label,
                from: newGift.from,
            }
        };
        return response;
    }
};
