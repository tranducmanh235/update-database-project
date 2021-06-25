const express = require('express');
const { verifyTokenCook } = require('../middleware/author');
const router = express.Router()
const FoodSchema = require("../schemas/Food")
const Cook = require('../schemas/Cook')

// Menu Handler
router.get("/foods", async (req, res) => {
    try {
        const food = await FoodSchema.find();
        res.json( {success: true, food} );
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
});

router.get("/foodscook", verifyTokenCook, async (req, res) => {
    try {
        const cook = await Cook.findById(req.cookId)
        if (!cook) return res.json({success:false, message: 'Account not found'})
        const food = await FoodSchema.find()
        res.json( {success: true, food} )
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
});

router.get("/foodscook", verifyTokenCook, async (req, res) => {
    try {
        const cook = await Cook.findById(req.cookId)
        if (!cook) return res.json({success:false, message: 'Account not found'})
        const food = await FoodSchema.find()
        res.json( {success: true, food} )
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
});

router.post('/changeFoodAvail', verifyTokenCook, async (req,res) => {
    const {foodId} = req.body
    try {
        const cook = await Cook.findById(req.cookId)
        if (!cook) return res.json({success:false, message: 'Account not found'})
        const food = await FoodSchema.findById(foodId)
        if (food) {
            if (food.avail === true) {
                await FoodSchema.findByIdAndUpdate(foodId, {avail: false})
            }
            else if (food.avail === false) {
                await FoodSchema.findByIdAndUpdate(foodId, {avail: true})
            }
            res.json({success: true, message: 'Avail has been updated successfully'})
        }
        else {
            res.json({success: false, message: 'Food not found'})
        }
    }
    catch(error) {
        console.log(error)
        res.json({success: false, message: 'Internal server error'})
    }
})


router.get("/foods/:foodID", async (req, res) => {
    await FoodSchema.findOne({ foodID: req.params.foodID },
        (err, data) => {
            if (err) {
                console.log(err);
                return res.send(500, 'Something Went wrong with Retrieving data');
            } else {
                console.log(data);
                res.json(data);
            }
        }
    );
});

module.exports = router