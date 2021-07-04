/*
///////////////////
// Requirements //
/////////////////
*/

const client = require('./client');
const { createInsertString, createValueString, createSetString } = require('./utils');

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

async function updateGame(id, fields){
    try{
        const setString = createSetString(fields)
        if (setString.length === 0){ return }

        const { rows: [game] } = await client.query(`
        UPDATE games
        SET ${setString}
        WHERE id = ${id}
        RETURNING *;
        `, Object.values(fields))

        return game
    } catch (error){
        throw error
    }
}
  
async function deleteGame(id){
    try{
        const {rows: [deletedGame]} = await client.query(`
        DELETE FROM games
        WHERE id = ${id}
        RETURNING *;
        `)

        return deletedGame
    }catch(error){
        throw error
    }
}

/*
//////////////
// Exports //
////////////
*/

module.exports = {
    createGame,
    getAllGames,
    getGameById,
    updateGame,
    deleteGame
};