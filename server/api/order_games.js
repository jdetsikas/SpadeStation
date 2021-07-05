const express = require('express')
const orderGamesRouter = express.Router()
const {addGameToOrder,
    getAllOrderGames,
    updateOrderGame,
    removeOrderGame} = require('../db')

const {requireUser} = require('./utils')



orderGamesRouter.post('/', requireUser, async(req, res, next) => {
        
        const {id} = req.user;
        const {orderId, gameId, quantity, purchCost} = req.body
    
    try{

        const addedGame = await addGameToOrder({orderId, gameId, quantity, purchCost});
        console.log('------------', addedGame)
        res.send(addedGame) 

    }catch(error){
        next(error)
    }
})





orderGamesRouter.patch('/:orderGameId', requireUser, async(req, res, next) => {

    const {id} = req.user;
    const {orderId, gameId, quantity, purchCost} = req.body

    try{
        const updatedOrderGame = await updateOrderGame({orderId, gameId, quantity, purchCost})
        console.log('------------', updatedOrderGame)
        res.send(updatedOrderGame) 
    }catch (error){
        next(error)
    }

})



orderGamesRouter.delete('/:orderGameId', requireUser, async(req, res, next) => {

    const {id} = req.user;
    const {orderId, gameId, quantity, purchCost} = req.body

    try{
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