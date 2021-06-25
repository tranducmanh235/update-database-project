const express = require('express')
require('dotenv').config()
const router = express.Router()
const argon2 = require('argon2')
const jsonwebtoken = require('jsonwebtoken')

const User = require('../schemas/User')
const Cook = require('../schemas/Cook')
const Manager = require('../schemas/Manager')
const { verifyTokenUser, verifyTokenCook, verifyTokenManager } = require('../middleware/author')

//user

router.post('/user/signup', async(req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email: email})
        if (user)
            return res.json({success:false, message: 'Email has already been used'})
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({email: email, password: hashedPassword})
        await newUser.save()
        res.json({success: true, message: 'Account has been created succesfully'})
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.post('/user/signin', async(req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email: email})
        if (!user)
            return res.json({success:false, message: 'Email or password is not correct'})
        const validPassword = await argon2.verify(user.password, password)
        if (!validPassword)
            return res.json({success:false, message: 'Email or password is not correct'})
        const encodedToken = jsonwebtoken.sign({userId: user._id}, process.env.ACCESS_TOKEN)
        res.json({success: true, message: 'Sign in succesfully', encodedToken})
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.get('/user', verifyTokenUser, async(req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user) return res.json({success:false, message: 'Account not found'})
        res.json({success: true, user})
    }
    catch (error) {
        console.log(error)
    }
})

// cook

router.post('/cook/signup', async(req, res) => {
    const {email, password} = req.body
    try {
        const cook = await Cook.findOne({email: email})
        if (cook)
            return res.json({success:false, message: 'Email has already been used'})
        const hashedPassword = await argon2.hash(password)
        const newCook = new Cook({email: email, password: hashedPassword})
        await newCook.save()
        res.json({success: true, message: 'Account has been created successfully'})
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.post('/cook/signin', async(req, res) => {
    const {email, password} = req.body
    try {
        const cook = await Cook.findOne({email: email})
        if (!cook)
            return res.json({success:false, message: 'Email or password is not correct'})
        const validPassword = await argon2.verify(cook.password, password)
        if (!validPassword)
            return res.json({success:false, message: 'Email or password is not correct'})
        const encodedToken = jsonwebtoken.sign({cookId: cook._id}, process.env.ACCESS_TOKEN)
        res.json({success: true, message: 'Sign in successfully', encodedToken})
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.get('/cook', verifyTokenCook, async(req, res) => {
    try {
        const cook = await Cook.findById(req.cookId).select('-password')
        if (!cook) return res.json({success:false, message: 'Account not found'})
        res.json({success: true, cook})
    }
    catch (error) {
        console.log(error)
    }
})

// manager

router.post('/manager/signup', async(req, res) => {
    const {email, password} = req.body
    try {
        const manager = await Manager.findOne({email: email})
        if (manager)
            return res.json({success:false, message: 'Email has already been used'})
        const hashedPassword = await argon2.hash(password)
        const newManager = new Manager({email: email, password: hashedPassword})
        await newManager.save()
        res.json({success: true, message: 'Account has been created successfully'})
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.post('/manager/signin', async(req, res) => {
    const {email, password} = req.body
    try {
        const manager = await Manager.findOne({email: email})
        if (!manager)
            return res.json({success:false, message: 'Email or password is not correct'})
        const validPassword = await argon2.verify(manager.password, password)
        if (!validPassword)
            return res.json({success:false, message: 'Email or password is not correct'})
        const encodedToken = jsonwebtoken.sign({managerId: manager._id}, process.env.ACCESS_TOKEN)
        res.json({success: true, message: 'Sign in successfully', encodedToken})
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})

router.get('/manager', verifyTokenManager, async(req, res) => {
    try {
        const manager = await Manager.findById(req.managerId).select('-password')
        if (!manager) return res.json({success:false, message: 'Account not found'})
        res.json({success: true, manager})
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router