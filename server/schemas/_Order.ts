// noinspection JSUnusedGlobalSymbols

const mongoose = require('mongoose')
const Schema = mongoose.Schema

enum Status {
    Waiting = "waiting", // Waiting to be process?
    Pending = "pending", // Waiting to be process?
    Processing = "processing", // Being Process at Kitchen
    Completed = "completed", // Complete
}

class OrderItem {
    'use strict'
    private itemID: string;
    private itemPrice: number;
    private qty: number;

    constructor(id, qty = 1, per_item_price: 0) {
        this.itemID = id;
        this.itemPrice = per_item_price;
        this.qty = qty;
    }
}

const OrderSchema = new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        itemList: {
            type: Schema.Types.Array,
            required: true
        },

        status: {
            type: Schema.Types.String,
            enum: ['waiting', 'pending', 'processing', 'completed'],
            require: true
        },
    },
    {
        timestamps: true,
    })

module.exports.OrderSchema = mongoose.model('order', OrderSchema);
module.exports.OrderItem = OrderItem;
module.exports.Status = Status;