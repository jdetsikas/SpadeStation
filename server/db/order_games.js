/*
///////////////////
// Requirements //
/////////////////
*/

const client = require('./client')
const { createInsertString, createValueString } = require('./utils')
const { getGameById } = require('./games')

/*
////////////////
// Functions //
//////////////
*/

async function addGameToOrder(fields) {
    try {
        const gameToAdd = await getGameById(fields.gameId)
        fields.purchCost = gameToAdd.price

        const insert = createInsertString(fields)
        const values = createValueString(fields)

        const {rows: [addedGame] } = await client.query(`
            INSERT INTO order_games(${insert})
            VALUES (${values})
            RETURNING *
        `, Object.values(fields));

        return addedGame;
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
    addGameToOrder
}