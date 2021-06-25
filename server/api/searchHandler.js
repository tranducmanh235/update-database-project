const express = require('express')
const router = express.Router()
const FoodSchema = require("../schemas/Food")

router.get("/search", async (req, res) => {
    if (Object.keys(req.query).length === 0) {
        return res.status(403).send("Empty search!")
    }
    else {
        let query = Object();
        if (req.query.foodName) {
            query['name'] = RegExp(req.query.foodName, 'i');
        }
        if (req.query.foodType) {
            query['type'] = req.query.foodType;
        }
        await FoodSchema.find(query,
            function (err, docs) {
                if (err) {
                    console.log(err);
                    return res.send(500, 'Something Went wrong with Retrieving data');
                } else {
                    console.log(docs);
                    res.json(docs);
                }
            }
        )
    }

});



module.exports = router