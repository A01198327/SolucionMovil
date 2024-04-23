const config = require("../config")
const helper = require("../helper")
const database = require("./database");

async function getEmpleados(){
    const rows = await database.query(`SELECT * FROM Empleado ORDER BY Puntos`);
    const data = helper.emptyOrRows(rows);
    return {
        data,
    }
}

async function getEmpleadoById(idEmpleado){
    const rows = await database.query(`SELECT * FROM Empleado WHERE idEmpleado = '${idEmpleado}'`);
    const data = helper.emptyOrRows(rows);
    return {
        data,
    }
}

module.exports = {getEmpleadoById, getEmpleados};
