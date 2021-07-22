/*
///////////////////
// Requirements //
/////////////////
*/

const express = require('express')
const orderGamesRouter = express.Router()

const { getOrderById, addGameToOrder, getAllOrderGames, getAllOrderGamesById, updateOrderGame,  removeOrderGame, getUsersCartById, clearCart } = require('../db')
const { requireUser } = require('./utils')

/*
////////////////
// Listeners //
//////////////
*/

// CREATE //
orderGamesRouter.post('/', requireUser, async(req, res, next) => {
    try {
        const { id } = req.user;
        const { gameId } = req.body

        const cart = await getUsersCartById(id);
        const cartId = cart.id;
        
        const gameAddedToOrder = await addGameToOrder(cartId, gameId);
        res.send(gameAddedToOrder) 
    } catch (error) {
        next(error)
    }
})


// READ //
orderGamesRouter.get('/', async(req, res, next) => {
    try {
        const orderGames = await getAllOrderGames();
        res.send(orderGames)
    } catch (error) {
        next(error)
    }
})

orderGamesRouter.get('/:orderId', requireUser, async(req, res, next) => {
    try {
        const { orderId } = req.params
        const ordersGames = await getAllOrderGamesById(orderId);
        res.send(ordersGames)
    } catch (error) {
        next(error)
    }
})


// UPDATE //
orderGamesRouter.patch('/:orderId', requireUser, async(req, res, next) => {
    try {
        const { orderId } = req.params
        const { gameId, quantity } = req.body;

        const updatedOrderGame = await updateOrderGame(orderId, {gameId, quantity})
        res.send(updatedOrderGame) 
    } catch (error) {
        next(error)
    }
})


// DELETE //
orderGamesRouter.delete('/:orderId', requireUser, async(req, res, next) => {
    try {
        const { gameId } = req.body
        const { orderId } = req.params

        const deletedOrderGame = await removeOrderGame(orderId, gameId)
        res.send(deletedOrderGame) 
    } catch (error) {
        next(error)
    }
})

orderGamesRouter.delete('/:orderId/all', requireUser, async(req, res, next) => {
    try {
        const { id } = req.user;
        const { orderId } = req.params;
        const order = await getOrderById(id)

        if (id !== order.buyerId) {
            res.status(401).send( {error: "User Id and Targeted Cart don't match"})
        } else {
            const clearedCart= await clearCart(orderId);
            res.send(clearedCart) 
        }
    } catch(error) {
        next(error)
    }
})

module.exports = orderGamesRouter