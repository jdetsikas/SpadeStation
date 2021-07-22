/*
///////////////////
// Requirements //
/////////////////
*/

const express = require('express')
const ordersRouter = express.Router()

const {createOrder, updateOrder, getOrdersWithoutGames, getUsersOrders, getOrderById} = require('../db')
const{requireUser, requireAdmin} = require('./utils')

/*
////////////////
// Listeners //
//////////////
*/

// CREATE //
ordersRouter.post('/', requireUser, async (req, res, next) => {
    try{
        const {id} = req.user;
        const fields = {"buyerId": id}
        
        const newOrder = await createOrder(fields);
        res.send(newOrder) 
    } catch(error){
        next(error)
    }

})


// READ //
ordersRouter.get('/', async(req, res, next) => {
    try {
        const allOrders = await getOrdersWithoutGames();
        res.send(allOrders)
    } catch (error) {
        next(error)
    }
})

ordersRouter.get('/:userId', requireUser, async(req, res, next) => {
    try {
        const { userId } = req.params
        const userOrders = await getUsersOrders(userId);
        res.send(userOrders)
    } catch (error) {
        next(error)
    }
})


// UPDATE //
ordersRouter.patch('/:orderId', requireUser, requireAdmin, async(req, res, next) => { 
    try {
        const { id } = req.user
        const { orderId } = req.params
        const { buyerId } = await getOrderById(orderId);

        if (buyerId === id) {
            const updatedOrder = await updateOrder(orderId, req.body);
            res.send(updatedOrder)
        } else {
            next({message: 'Invalid'})
        }
    } catch (error) {
        next(error)
    }
})

module.exports = ordersRouter