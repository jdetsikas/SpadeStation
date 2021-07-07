/*
///////////////////
// Requirements //
/////////////////
*/

const client = require('./client')
const { createInsertString, createValueString, createSetString } = require('./utils')
const { getGameById } = require('./games')

/*
////////////////
// Functions //
//////////////
*/

async function getAllOrderGames() {
    try {
        const { rows: orderGames } = await client.query(`
            SELECT * FROM order_games
        `)

        return orderGames
    } catch (error) {
        throw error
    }
}

async function addGameToOrder(fields) {
    try {
        const gameToAdd = await getGameById(fields.gameId)
        fields.purchCost = gameToAdd.price

        const insert = createInsertString(fields)
        const values = createValueString(fields)
        if (insert.length === 0 || values.length === 0) { return }

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

async function updateOrderGame(orderId, fields){
    try{
        
        const gameId = fields.gameId
        delete fields.gameId

        const setString = createSetString(fields)

        if (setString.length === 0){ return }

        const{ rows : [updatedOrderGame] } = await client.query(`
            UPDATE order_games
            SET ${setString}
            WHERE "orderId" = ${orderId}
            AND "gameId" = ${gameId}
            RETURNING *;
        `, Object.values(fields))

        return updatedOrderGame
    }catch (error){
        throw error
    }
}

async function removeOrderGame(orderId, gameId){
    try{
        const { rows: [removed] } = await client.query(`
            DELETE FROM order_games
            WHERE "orderId"= $1 AND "gameId" = $2
            RETURNING *;
        `, [orderId, gameId] )

        return removed
    }catch (error){
        throw error
    }
}

/*
//////////////
// Exports //
////////////
*/

module.exports = {
    addGameToOrder,
    getAllOrderGames,
    updateOrderGame,
    removeOrderGame
}