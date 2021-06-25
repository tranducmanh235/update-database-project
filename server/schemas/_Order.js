// noinspection JSUnusedGlobalSymbols
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Status;
(function (Status) {
    Status["Waiting"] = "waiting";
    Status["Pending"] = "pending";
    Status["Processing"] = "processing";
    Status["Completed"] = "completed";
})(Status || (Status = {}));
var OrderItem = /** @class */ (function () {
    function OrderItem(id, qty, per_item_price) {
        if (qty === void 0) { qty = 1; }
        this.itemID = id;
        this.itemPrice = per_item_price;
        this.qty = qty;
    }
    return OrderItem;
}());
var OrderSchema = new Schema({
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
        "enum": ['waiting', 'pending', 'processing', 'completed'],
        require: true
    }
}, {
    timestamps: true
});
module.exports.OrderSchema = mongoose.model('order', OrderSchema);
module.exports.OrderItem = OrderItem;
module.exports.Status = Status;
