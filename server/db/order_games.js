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

async function updateOrderGame(id, fields){
    try{
        const setString = createSetString(fields)
        if (setString.length === 0){
            return
        }

        const{
            rows : [updatedOrderGame]
        } = await client.query(`
        UPDATE order_games
        SET ${setString}
        WHERE id = ${id}
        RETURNING *;
        `
        , Object.values(fields))
        return updatedOrderGame

    }catch (error){
        throw error
    }
}

async function removeOrderGame(gameId, orderId){
    try{
        const {rows: [removed]} = await client.query(`
        DELETE FROM order_games
        WHERE "gameId"= $1 AND "orderId" = $2
        RETURNING *;
        `
        ,[gameId, orderId])

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
    updateOrderGame,
    removeOrderGame
}