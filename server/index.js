const express = require('express')
const cors = require('cors')
const connectDatabase = require('./config/database')
const authen = require('./api/authen')
const foodHandler = require("./api/foodHandler");
const orderHandler = require("./api/orderHandler")
const searchHandler = require("./api/searchHandler");
const addFoodHandler = require('./api/addNewFoodHandler')
const payment = require('./api/testing_pushOrderHandler')

require('dotenv').config()

connectDatabase()
const server = express()
server.use(cors())
server.use(express.json())

server.use("/images", express.static("images"));

server.use(express.urlencoded({ extended: false }));

server.use('/api/authen', authen)
server.use('/api/foodHandler', foodHandler)
server.use('/api/orderHandler', orderHandler)
server.use('/api/addFood', addFoodHandler)
server.use("/orders", payment);

const PORT = 5000

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))