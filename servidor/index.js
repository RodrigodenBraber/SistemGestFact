const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const apiRutas = require("./rutas/api");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas de la API
app.use("/api", apiRutas);

// Manejar rutas desconocidas de la API
/*app.use('/api/*', (req, res) => {
  res.status(404).send('Not Found');
});

// Manejar rutas desconocidas generales
  app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});*/

app.use(function (req, res, next) {
  res.status(404).send("Not Found");
});

// Servir los archivos estáticos de la aplicación de React
app.use("/static", express.static(path.join(__dirname, "../cliente/build")));

// Para cualquier otra ruta, responde con el archivo index.html de la aplicación de React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../cliente/build/", "index.html"), {
    headers: {
      "Content-Type": "text/html; charset=UTF-8",
    },
  });
});

// Iniciar el servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
