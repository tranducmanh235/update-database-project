const express = require('express');
const { verifyTokenUser, verifyTokenCook } = require('../middleware/author');
const router = express.Router()
const Order = require('../schemas/Order')
const User = require('../schemas/User')
const Cook = require('../schemas/Cook')
const Payment = require('../schemas/Payment')

router.get('/orders', verifyTokenUser, async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.json({success:false, message: 'Account not found'})
        const orders = await Order.find({user: req.userId})
        res.json( {success: true, orders} )
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.get('/pendingorders', verifyTokenCook, async (req, res) => {
    try {
        const cook = await Cook.findById(req.cookId)
        if (!cook) return res.json({success:false, message: 'Account not found'})
        const orders = await Order.find({status: 'pending'})
        res.json( {success: true, orders} )
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.get('/processingorders', verifyTokenCook, async (req, res) => {
    try {
        const cook = await Cook.findById(req.cookId)
        if (!cook) return res.json({success:false, message: 'Account not found'})
        const orders = await Order.find({status: 'processing'})
        res.json( {success: true, orders} )
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.get('/completedorders', verifyTokenCook, async (req, res) => {
    try {
        const cook = await Cook.findById(req.cookId)
        if (!cook) return res.json({success:false, message: 'Account not found'})
        const orders = await Order.find({status: 'completed'});
        res.json( {success: true, orders} );
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.post('/makeOrder', verifyTokenUser, async (req, res) => {
    const {cart, total} = req.body
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.json({success:false, message: 'Account not found'})
        const newOrder = new Order({listFood: cart, total: total, status: 'waiting', user: user._id})
        await newOrder.save()
        res.json({success: true, message: 'Order has been placed successfully'})
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.post('/cancelOrder', verifyTokenUser, async (req, res) => {
    const {orderId} = req.body
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.json({success:false, message: 'Account not found'})
        const order = await Order.findById(orderId)
        if (order) {
            await Order.findByIdAndDelete(orderId)
            res.json({success: true, message: 'Order has been canceled successfully'})
        }
        else {
            res.json({success: false, message: 'Order not found'})
        }
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.post('/makePayment', verifyTokenUser, async (req, res) => {
    const {orderId} = req.body
    try {
        const user = await User.findById(req.userId)
        if (!user) return res.json({success:false, message: 'Account not found'})
        const order = await Order.findById(orderId)
        if (order) {
            if (order.status === 'waiting') {
                const newPayment = new Payment({order: orderId, user: user._id})
                await newPayment.save()
                await Order.findByIdAndUpdate(orderId, {status: 'pending'})
                res.json({success: true, message: 'Order has been placed successfully'})
            }
            else {
                res.json({success: false, message: 'Order has been paid'})
            }
        }
        else {
            res.json({success: false, message: 'Order not found'})
        }
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.post('/changeOrderStatus', verifyTokenCook, async (req,res) => {
    const {orderId} = req.body
    try {
        const cook = await Cook.findById(req.cookId)
        if (!cook) return res.json({success:false, message: 'Account not found'})
        const order = await Order.findById(orderId)
        if (order) {
            if (order.status === 'pending') {
                await Order.findByIdAndUpdate(orderId, {status: 'processing'})
            }
            else if (order.status === 'processing') {
                await Order.findByIdAndUpdate(orderId, {status: 'completed'})
            }
            res.json({success: true, message: 'Status has been updated successfully'})
        }
        else {
            res.json({success: false, message: 'Order not found'})
        }
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

module.exports = router