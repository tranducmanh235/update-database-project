const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentSchema = new Schema({
    createAt: {
        type: Date,
        default: Date.now
    },

    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
})

module.exports = mongoose.model('Payment', PaymentSchema)