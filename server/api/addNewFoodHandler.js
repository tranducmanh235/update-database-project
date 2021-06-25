const router = require("express").Router();
const FoodSchema = require("../schemas/Food");

const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images/");
    },
    filename: (req, file, cb) => {
        console.log(req.body)
        const date = Date.now()
            .toString()
            .slice(0, 10);
        cb(null, `${file.originalname}`);
    }
});

const imageFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else cb(null, false);
};

const upload = multer({
    fileFilter: imageFilter,
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
});

router.post("/uploadImage", upload.single("FoodImage"),
    (req, res) => {
        console.log(req.file.path)
        res.status(201).json("Successfully added");
    }
);

router.post("/addFood", upload.single("FoodImage"), (req, res) => {
    return res.status(400).json("Not Implement Yet");
    const {
        foodID,
        name,
        price,
        type,
        description,
        avail
    } = req.body;
    let imageURL = req.file.path;

    new FoodSchema({
        foodID,
        name,
        price,
        imageURL,
        type,
        description,
        avail
    })
        .save()
        .then(info => {
            res.status(201).json("Successfully added");
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;
