const database = require("./database");

async function insertImage(file) {
  try {
    const direccionImagenEscaped = file.replace(/'/g, "''");

    const queryString = `
      INSERT INTO Imagen (direccionImagen)
      VALUES ('${direccionImagenEscaped}');
    `;
    await database.query(queryString);
    return { success: true, message: 'Image inserted successfully' };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Error' };
  }
}



module.exports = { insertImage };
