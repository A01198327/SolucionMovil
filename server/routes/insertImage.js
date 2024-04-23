const express = require("express");
const router  = express.Router();
const images = require("../services/images");


router.post('/', async function (req, res, next) {
    try {
        const { file } = req.body;
        const result = await images.insertImage(file);
        res.status(201).json(result);
    } catch (err) {
        console.error(`Error: `, err.message);
        next(err);
    }
});

module.exports = router;

