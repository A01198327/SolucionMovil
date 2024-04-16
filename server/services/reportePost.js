const database = require("./database");

async function insertReporte(titulo, desc, tienda, sucursal, IdEmpleado) {
  try {
    const tituloEscaped = titulo.replace(/'/g, "''");
    const descEscaped = desc.replace(/'/g, "''");
    const tiendaEscaped = tienda.replace(/'/g, "''");
    const sucursalEscaped = sucursal.replace(/'/g, "''");

    const queryString = `
      INSERT INTO Reporte (Fecha, Descripcion, Estatus, Titulo, Tienda, Sucursal, IDEmpleado)
      VALUES (CURRENT_TIMESTAMP, '${descEscaped}', 'Abierto', '${tituloEscaped}', '${tiendaEscaped}', '${sucursalEscaped}', '${IdEmpleado}');
    `;
    await database.query(queryString);
    return { success: true, message: 'Report inserted successfully' };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Error' };
  }
}

module.exports = { insertReporte };
