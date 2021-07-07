const express = require('express')
const ordersRouter = express.Router()
const {createOrder,
    updateOrder,
    deleteOrder,
    getOrdersWithoutGames,
    getUsersOrders,
    getOrderById} = require('../db')

    const{requireUser, requireAdmin} = require('./utils')

//-------------------Require Admin is used for these routes--------------//

/* Get orders */

ordersRouter.get('/', async(req, res, next) => {
    // console.log(req.params)
    try{

        const orders = await getOrdersWithoutGames();

        res.send(orders)

    }catch(error){
        next(error)
    }
})

ordersRouter.get('/:userId', async(req, res, next) => {
    try{
        const {userId} = req.params
        const userOrders = await getUsersOrders(userId);
        res.send(userOrders)
    }catch(error){
        next(error)
    }
})

/* Create an order*/

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




/* Update an order */

ordersRouter.patch('/:orderId', requireUser, requireAdmin, async(req, res, next) => {
    
    const {id} = req.user;
    console.log('WHat is the user id?',id)
    
    const {orderId} = req.params
    console.log('the order id:----',orderId)

    // const {payment, shippingLoc, orderStatus} = req.body;

    console.log('the req.body------', req.body)

    // res.send('hello')

    try{
        const {buyerId} = await getOrderById(orderId);

        // console.log('yoooo----', buyerId)

        if (buyerId === id){
            
        // const id = routineId;

        const updatedOrder = await updateOrder(orderId, req.body);
        console.log('the updated order ------', updateOrder)

        // res.send('HEllo2')
        res.send(updatedOrder)
        }else{
            next({message: 'Invalid'})
        }

    }catch (error){
        next(error)
    }

})



///////-------------------------Possible-----------------------------////////

/* Update an order status (kind of acts like deleting) */
/* 
//For admin use only
ordersRouter.patch('admin/:orderId', requireUser, async(req, res, next) => {
    try{

    }catch(error){
        next(error)
    }
})
*/



module.exports = ordersRouter