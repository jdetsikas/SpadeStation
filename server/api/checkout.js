/*
///////////////////
// Requirements //
/////////////////
*/

const express = require('express')
const checkoutRouter = express.Router()

const {updateOrder} = require('../db')
const {requireUser} = require('./utils')

/*
////////////////
// Listeners //
//////////////
*/

// UPDATE //
checkoutRouter.patch('/:orderId', requireUser, async(req, res, next) => {
    try {
        const { orderId } = req.params;
        const { payment, shippingLoc} = req.body;
        const orderStatus = "PROCESSING";
        
        const checkedOut = await updateOrder(orderId, {payment, shippingLoc, orderStatus})
        res.send(checkedOut)
    } catch (error) {
        next(error)
    }
})

module.exports = checkoutRouter