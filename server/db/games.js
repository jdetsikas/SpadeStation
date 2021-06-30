const client = require('./client');
const { createInsertString, createValueString } = require('./utils');

async function createGame(fields) {
    const insert = createInsertString(fields);
    const values = createValueString(fields);
    
    try {
        const { rows: game } = await client.query(`
            INSERT INTO games(${insert})
            VALUES (${values})
            RETURNING *
        `, Object.values(fields));

        return game;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    createGame
};