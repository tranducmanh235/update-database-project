const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FoodSchema = new Schema({
    foodID : {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avail: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('Food', FoodSchema)