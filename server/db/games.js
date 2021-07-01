/*
///////////////////
// Requirements //
/////////////////
*/

const client = require('./client');
const { createInsertString, createValueString } = require('./utils');

/*
////////////////
// Functions //
//////////////
*/

async function createGame(fields) {
    try {
        const insert = createInsertString(fields);
        const values = createValueString(fields);
        
        const { rows: [game] } = await client.query(`
            INSERT INTO games(${insert})
            VALUES (${values})
            RETURNING *
        `, Object.values(fields));
        
        return game;
    } catch (error) {
        throw error;
    };
};

async function getAllGames() {
    try {
        const { rows: games } = await client.query(`
            SELECT * FROM games
        `)

        return games;
    } catch (error) {
        throw error;
    };
};

async function getGameById(id) {
    try {
        const { rows: [foundGame] } = await client.query(`
            SELECT * FROM games
            WHERE id=$1
        `, [id]);

        return foundGame;
    } catch (error) {
        throw error;
    };
};

/*
//////////////
// Exports //
////////////
*/

module.exports = {
    createGame,
    getAllGames,
    getGameById
};