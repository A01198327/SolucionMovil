const database = require("./database");

async function insertReporte(titulo, desc, IDempleado) {
  try {
    const tituloEscaped = titulo.replace(/'/g, "''");
    const descEscaped = desc.replace(/'/g, "''");

    const queryString = `
      INSERT INTO Reporte (Fecha, Texto, Descripcion, Estatus, FechaCierre, IDEmpleado)
      VALUES (CURRENT_TIMESTAMP, '${tituloEscaped}', '${descEscaped}', 'Abierto', NULL, ${IDempleado})
    `;
    await database.query(queryString);
    return { success: true, message: 'Report inserted successfully' };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Error' };
  }
}

module.exports = { insertReporte };
