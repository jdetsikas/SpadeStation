const express = require('express')
const orderGamesRouter = express.Router()
const {addGameToOrder,
    getAllOrderGames,
    updateOrderGame,
    removeOrderGame} = require('../db')

const {requireUser} = require('./utils')

orderGamesRouter.get('/', async(req, res, next) => {
    // console.log(req.params)
    try{

        const orderGames = await getAllOrderGames();

        res.send(orderGames)

    }catch(error){
        next(error)
    }
})

orderGamesRouter.post('/', requireUser, async(req, res, next) => {
        
        console.log('--zap---', req.body)
        const {id} = req.order;
        const {gameId, quantity, purchCost} = req.body
        console.log('What is the order id?', id)
    
    try{

        const orderId = id;
        const gameaAddedToOrder = await addGameToOrder({orderId, gameId, quantity, purchCost});
        console.log('------------', gameaAddedToOrder)
        res.send(gameaAddedToOrder) 

    }catch(error){
        next(error)
    }
})


orderGamesRouter.patch('/:orderGameId', requireUser, async(req, res, next) => {

    const {id} = req.order;
    const {gameId, quantity, purchCost} = req.body

    try{
        const orderId = id;
        const updatedOrderGame = await updateOrderGame({orderId, gameId, quantity, purchCost})
        console.log('------------', updatedOrderGame)
        res.send(updatedOrderGame) 
    }catch (error){
        next(error)
    }

})


orderGamesRouter.delete('/:orderGameId', requireUser, async(req, res, next) => {

    const {id} = req.order;
    const {gameId, quantity, purchCost} = req.body

    try{
        const orderId = id;
        const removedOrderGame = await removeOrderGame({orderId, gameId, quantity, purchCost})
        console.log('------------', removedOrderGame)
        res.send(removedOrderGame) 
    }catch (error){
        next(error)
    }

})


/*
    
*/




module.exports = orderGamesRouter