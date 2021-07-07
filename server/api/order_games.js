const express = require('express')
const orderGamesRouter = express.Router()
const {addGameToOrder,
    getAllOrderGames,
    updateOrderGame,
    removeOrderGame} = require('../db')

const {requireUser, requireAdmin} = require('./utils')

//-------------------Require Admin is used for these routes--------------//


orderGamesRouter.get('/', async(req, res, next) => {
    // console.log(req.params)
    try{

        const orderGames = await getAllOrderGames();

        res.send(orderGames)

    }catch(error){
        next(error)
    }
})

// orderGamesRouter.post('/', requireUser, async(req, res, next) => {
        
//         console.log('--zap---', req.body)
//         console.log('Heres the user', req.user)


        
//         // const {id} = req.order;
//         // const {gameId, quantity, purchCost} = req.body
//         // console.log('What is the order id?', id)

//         res.send('Testing order_games post route')
    
//     // try{

//     //     const orderId = id;
//     //     const gameAddedToOrder = await addGameToOrder({orderId, gameId, quantity, purchCost});
//     //     console.log('------------', gameAddedToOrder)
//     //     res.send(gameAddedToOrder) 

//     // }catch(error){
//     //     next(error)
//     // }
// })


orderGamesRouter.patch('/:orderId', requireUser, requireAdmin, async(req, res, next) => {

    console.log('requser', req.user)
    console.log('reqbody', req.body)


    const {orderId} = req.params
    console.log('params', req.params)

    try{
        const updatedOrderGame = await updateOrderGame(orderId, req.body)
        console.log('------------', updatedOrderGame)
        res.send(updatedOrderGame) 
    }catch (error){
        next(error)
    }

})


orderGamesRouter.delete('/:orderId', requireUser, requireAdmin, async(req, res, next) => {

    console.log('requser', req.user)
    console.log('reqbody', req.body)

    const {gameId} = req.body
    const {orderId} = req.params
    console.log('params', req.params)

    try{
        const deletedOrderGame = await removeOrderGame(orderId, gameId)
        console.log('------------', deletedOrderGame)
        res.send(deletedOrderGame) 
    }catch (error){
        next(error)
    }

})


/*
    
*/




module.exports = orderGamesRouter