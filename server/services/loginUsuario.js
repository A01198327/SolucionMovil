const config = require("../config")
const helper = require("../helper")
const database = require("./database");

async function getUsuario(username, passkey){
    const rows = await database.query(`SELECT * FROM Usuarios WHERE Username = '${username}' AND Passkey = '${passkey}'`);
    const data = helper.emptyOrRows(rows);
    return {
        data,
    }
}

module.exports = {getUsuario};
