
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

module.exports = {getMultiple};
