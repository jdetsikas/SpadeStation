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

async function addGameToOrder(cartId, gameId) {
    try {
        const gameToAdd = await getGameById(gameId)
        const purchCost = gameToAdd.price;

        // fields.purchCost = gameToAdd.price

        // const insert = createInsertString(fields)
        // const values = createValueString(fields)

        // if (insert.length === 0 || values.length === 0) { return }

        const {rows: [addedGame] } = await client.query(`
            INSERT INTO order_games ('orderId', 'gameId', 'purchCost')
            VALUES ($1, $2, $3)
            RETURNING *
        `, [cartId, gameId, purchCost]);

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

async function getUsersCartById(userId){
    try{

        const {rows: orders} = await client.query(`
            SELECT * FROM orders
            WHERE "buyerId" = ${userId}
        `)

       const [cart] = orders.filter(order => order.orderStatus === "CART")

        return cart        

    }catch(error){
        throw error
    }
}

async function clearCart(cartId){
    try{

        const {rows: cart} = await client.query(`
            DELETE FROM order_games
            WHERE "orderId" = ${cartId}
            RETURN *;
        `)

        return cart
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
    addGameToOrder,
    getAllOrderGames,
    updateOrderGame,
    removeOrderGame,
    getUsersCartById,
    clearCart
}