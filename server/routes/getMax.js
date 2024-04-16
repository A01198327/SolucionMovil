const express = require("express");
const router  = express.Router();
const reportes = require("../services/reportes");

router.get('/', async function (req, res, next){
    try {
        res.json(await reportes.getMax(req.query));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;