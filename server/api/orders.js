const express = require('express')
const ordersRouter = express.Router()
const {createOrder,
    updateOrder,
    deleteOrder,
    getOrdersWithoutGames} = require('../db')

    const{requireUser} = require('./utils')



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







/* Create an order*/

ordersRouter.post('/', requireUser, async(req, res, next) => {
    
    const {id} = req.user;
    const {buyerId, payment, shippingLoc, orderStatus} = req.body;

    // console.log(req)

    try{

        const buyerId = id;
        const newOrder = await createOrder({buyerId, payment, shippingLoc, orderStatus});
        console.log('------------',newOrder)
        res.send(newOrder) 

    } catch(error){
        next(error)
    }

})




/* Update an order */

// ordersRouter.patch('/:orderId', requireUser, async(req, res, next) => {
    
//     const {} = req.params;
//     const {isPublic, name, goal} = req.body;

//     try{
//         const {creatorId} = await getRoutineById(routineId);

//         if (creatorId === req.user.id){
            
//         const id = routineId;

//         const updatedOrder = await updateOrder(id, fields);
//         res.send(updatedOrder)
//         }else{
//             next({message: 'Invalid'})
//         }

//     }catch (error){
//         next(error)
//     }

// })



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