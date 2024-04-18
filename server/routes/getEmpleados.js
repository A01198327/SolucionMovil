const express = require("express");
const router  = express.Router();
const empleados = require("../services/getEmpleados");

router.get('/', async function (req, res, next){
    try {
        res.json(await empleados.getEmpleados(req.query));
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;