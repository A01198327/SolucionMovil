const express = require("express");
const app = express(); 
//const database = require("./services/database");
const path = require("path");
const port = 5000;
const reportesRouter = require("./routes/reportes");
const reportesPostRouter = require("./routes/insertReportes");
const reportesMaxRouter = require("./routes/getMax");
const cors = require('cors');



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
})
);

app.use(cors());
app.use("/reportes", reportesRouter);
app.use("/insertReporte", reportesPostRouter);
app.use("/getMax", reportesMaxRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

/*
app.get('/api', async (req, res) => {
    const records = await database.getReportes();
    res.json({ message: `hola desde el server, ${records[0].Estatus}`});
});
*/

const server = app.listen(port, function(){
    console.log("Server running at port 5000");
});
