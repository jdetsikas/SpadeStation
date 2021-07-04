const express = require('express')
const ordersRouter = express.Router()
const {createOrder,
    updateOrder,
    deleteOrder} = require('../db')
const{requireUser} = require('./utils')


/* Create an order*/
/* 
ordersRouter.post('/', requireUser, async(req, res, next) => {
    try{

    }catch(error){
        next(error)
    }
})
*/




/* Update an order */
/* 
ordersRouter.patch('/:orderId', requireUser, async(req, res, next) => {
    try{

    } catch(error){
        next(error)
    }
})
*/



/* Destroy an order*/
/* 
//For admin use only
ordersRouter.delete('/:orderId;, requireUser, async(req, res, next) => {
    try{

    }catch(error){
        next(error)
    }
})
*/



module.exports = ordersRouter