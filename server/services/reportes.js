
const config = require("../config")
const helper = require("../helper")
const database = require("./database");

async function getMultiple(){
    const rows = await database.query(`SELECT * FROM Reporte`);
    const data = helper.emptyOrRows(rows);
    return {
        data,
    }
}

async function getMultipleUsuario(IdEmpleado){
    const rows = await database.query(`SELECT * FROM Reporte WHERE IdEmpleado = ${IdEmpleado}`);
    const data = helper.emptyOrRows(rows);
    return {
        data,
    }
}

async function getMax(){
    const data = await database.query(`SELECT MAX(IDReporte) FROM Reporte`);
    return {
        data,
    }
}

module.exports = {getMultiple, getMax, getMultipleUsuario};
