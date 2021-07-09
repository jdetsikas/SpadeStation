const express = require('express')
const orderGamesRouter = express.Router()
const {getOrderById,addGameToOrder,
    getAllOrderGames,
    getAllOrderGamesById,
    updateOrderGame,
    removeOrderGame, getUsersCartById, clearCart} = require('../db')

const {requireUser, requireAdmin} = require('./utils')

//-------------------Require Admin is used for these routes--------------//


orderGamesRouter.get('/', async(req, res, next) => {
    try{
        const orderGames = await getAllOrderGames();
        res.send(orderGames)
    }catch(error){
        next(error)
    }
})

orderGamesRouter.get('/:orderId', requireUser, async(req, res, next) => {
    try{
        const {orderId} = req.params
        const ordersGames = await getAllOrderGamesById(orderId);
        res.send(ordersGames)
    }catch(error){
        next(error)
    }
})

orderGamesRouter.post('/', requireUser, async(req, res, next) => {
        
        console.log('--zap---', req.body)
        console.log('Heres the user', req.user)


        
        const {id} = req.user;
        const {gameId} = req.body
        console.log('the gameId----',gameId)
        // console.log('What is the order id?', id)

        // res.send('Testing order_games post route')
    
    try{

        const cart = await getUsersCartById(id);
        const cartId = cart.id;

        console.log('the cartId---',cartId)
        
        const gameAddedToOrder = await addGameToOrder(cartId, gameId);

        // console.log('added game-----',gameAddedToOrder)


        res.send(gameAddedToOrder) 

    }catch(error){
        next(error)
    }
})


orderGamesRouter.patch('/:orderId', requireUser, async(req, res, next) => {
    const {orderId} = req.params
    const {gameId, quantity} = req.body;

    try{
        const updatedOrderGame = await updateOrderGame(orderId, {gameId, quantity})
        res.send(updatedOrderGame) 
    }catch (error){
        next(error)
    }
})


orderGamesRouter.delete('/:orderId', requireUser, async(req, res, next) => {
    const {id} = req.user;
    const {gameId} = req.body
    const {orderId} = req.params

    try{
        const deletedOrderGame = await removeOrderGame(orderId, gameId)
        res.send(deletedOrderGame) 
    }catch (error){
        next(error)
    }
})



//clear out cart route//

orderGamesRouter.delete('/:orderId/all', requireUser, async(req, res, next) => {
    const {id} = req.user;
    const {orderId} = req.params;

    try{
        const order = await getOrderById(id)

        if (id !== order.buyerId) {
            res.status(401).send( {error: "User Id and Targeted Cart don't match"})
        } else {
            const clearedCart= await clearCart(orderId);
            res.send(clearedCart) 
        }
    }catch(error){
        next(error)
    }
})


/*
    
*/




module.exports = orderGamesRouter