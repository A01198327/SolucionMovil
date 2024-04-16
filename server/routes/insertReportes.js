const express = require("express");
const router  = express.Router();
const reportePost = require("../services/reportePost");


router.post('/', async function (req, res, next) {
    try {
        const { titulo, descripcion, tienda, sucursal, IdEmpleado } = req.body;
        const result = await reportePost.insertReporte(titulo, descripcion, tienda, sucursal, IdEmpleado);
        res.status(201).json(result);
    } catch (err) {
        console.error(`Error: `, err.message);
        next(err);
    }
});

module.exports = router;

