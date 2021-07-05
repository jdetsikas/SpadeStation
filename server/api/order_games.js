const express = require('express')
const orderGamesRouter = express.Router()
const {addGameToOrder,
    getAllOrderGames,
    updateOrderGame,
    removeOrderGame} = require('../db')

const {requireUser} = require('./utils')


/*
orderGamesRouter.post('/', requireUser, async(req, res, next) => {
    
    try{

    }catch(error){
        next(error)
    }
})
*/


/* 
orderGamesRouter.patch('/:orderGameId', requireUser, async(req, res, next) => {

    try{

    }catch (error){
        next(error)
    }

})
*/

/*
orderGamesRouter.delete('/:orderGameId', requireUser, async(req, res, next) => {

    try{

    }catch (error){
        next(error)
    }

})
*/

/*
    
*/




module.exports = orderGamesRouter