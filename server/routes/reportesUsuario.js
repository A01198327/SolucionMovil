const express = require("express");
const router = express.Router();
const reportes = require("../services/reportes");

router.get('/', async function (req, res, next){
    try {
        const { IdEmpleado } = req.query;
        if (!IdEmpleado) {
            return res.status(400).json({ error: 'Se requiere el ID del empleado' });
        }
        const result = await reportes.getMultipleUsuario(IdEmpleado);
        res.json(result);
    } catch (err) {
        console.error(`Error`, err.message);
        
        next(err);
    }
});

module.exports = router;
