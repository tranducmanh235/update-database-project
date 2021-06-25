const express = require('express')
const router = express.Router()
const {OrderSchema, _, Status} = require("../schemas/_Order")
const FoodSchema = require("../schemas/Food")
const UserSchema = require("../schemas/User")

router.post("/pushOrder", async (req, res) => {
    const {
        userID,
        email,
        itemList
    } = req.body;
    let status = Status.Pending;
    let user = undefined;
    if (userID) {
        // Test If UserID exist,
        user = await UserSchema.findOne({_id: userID})
    } else if (email) {
        user = await UserSchema.findOne({email: email});
    } else {
        return res.status(400)
            .json("User not found!");
    }

    itemList.forEach(
        async (item) => {
            let it = await FoodSchema.findOne({foodID: item.itemID})
            console.log(it)
        }
    )

    (new OrderSchema({
        user: user._id,
        itemList: itemList,
        status: status
    }))
        .save()
        .then(info => {
            res.status(201)
                .json("Your Order has been added to database.");
        })
        .catch(err => {
            res.status(400)
                .json(err);
        });
});


module.exports = router