const express = require('express')
const orderCheckoutRouter = express.Router()
const {updateOrder} = require('../db')

const {requireUser, requireAdmin} = require('./utils')

// orderId and cartId are the same but cartId is an order with status "CART" //
// order is a variable-constant (constatnK * x), and status is a variable (can always change "CART","PROCESSING","SHIPPED",etc.) //

orderCheckoutRouter.patch('/:orderId', requireUser, async(req, res, next) => {
    const { orderId } = req.params;
    const { payment, shippingLoc} = req.body;
    const orderStatus = "PROCESSING";

    // console.log('what order?', orderId)
    // console.log('WHat payment?', payment)
    // console.log('what location?', shippingLoc)

    // res.send('working on the checkout')

    try{

        const checkedOut = await updateOrder(orderId, {payment, shippingLoc, orderStatus})
        // console.log('the checkout ', checkedOut)
        res.send(checkedOut)

    }catch(error){
        next(error)
    }

})



module.exports = orderCheckoutRouter