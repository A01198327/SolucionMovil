const sql = require('mssql');
const config = require('../config');

async function query(sqlQuery) {
    try {
        await sql.connect(config);
        console.log('Database connected successfully');
        const result = await sql.query(sqlQuery);
        return result.recordset;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err; 
    } finally {
        sql.close();
    }
}

module.exports = {
    query
};
