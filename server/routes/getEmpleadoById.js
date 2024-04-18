const express = require("express");
const router = express.Router();
const empleados = require("../services/getEmpleados");

router.get('/', async function (req, res, next){
    try {
        const { IdEmpleado } = req.query;
        if (!IdEmpleado) {
            return res.status(400).json({ error: 'Se requiere el ID del empleado' });
        }
        const result = await empleados.getEmpleadoById(IdEmpleado);
        res.json(result);
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;
