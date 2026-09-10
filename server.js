const express = require('express');
const cors = require('cors');
const db = require("./src/models")
const { PORT, FRONTEND_URL } = require("./src/config/config.js")
const requestLogger = require("./src/middleware/requestLogger.js");

const bloqueRoute = require("./src/routes/bloque.route.js");
const categoriaRoute = require("./src/routes/categoria.route.js");
const bloquePlacaRoute = require("./src/routes/bloque.placa.route.js");
const conexionBloqueRoute = require("./src/routes/conexion.bloque.route.js");
const estadoBloqueRoute = require("./src/routes/estado.bloque.routes.js");
const extensionCategoriaRoute = require("./src/routes/extension.categoria.route.js");
const extensionRoute = require("./src/routes/extension.route.js");
const estadoExtensionRoute = require("./src/routes/estado.extension.route.js");
const formaBloqueRoute = require("./src/routes/forma.bloque.route.js");
const opcionParametroRoute = require("./src/routes/opcion.parametro.route.js");
const parametroRoute = require("./src/routes/parametro.route.js");
const placaRoute = require("./src/routes/placa.route.js");
const tipoBloqueRoute = require("./src/routes/tipo.bloque.route.js");
const tipoDatoRoute = require("./src/routes/tipo.dato.route.js");
const tipoConexionRoute = require("./src/routes/tipo.conexion.route.js")
class Server {
  constructor() {
    this.app = express();
    this.port = PORT;

    this.app.use(express.json());

    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();

    this.connectDB();
  }
  configureMiddlewares() {
    this.app.use(requestLogger);

    this.app.use(cors({
      origin: FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT"],
      allowedHeaders: ["Content-Type", "Authorization"],
      exposedHeaders: ["Set-Cookie"]
    }))

  }
  configureErrorHandling() {
    this.app.use((err, req, res, _next) => {
      console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err.stack || err.message);
      res.status(err.status || 500).json({ ok: false, message: 'Error interno del servidor.' });
    });
  }
  configureRoutes() {
    new bloqueRoute(this.app);
    new bloquePlacaRoute(this.app);
    new categoriaRoute(this.app);
    new conexionBloqueRoute(this.app);
    new estadoBloqueRoute(this.app);
    new extensionCategoriaRoute(this.app);
    new extensionRoute(this.app);
    new estadoExtensionRoute(this.app);
    new formaBloqueRoute(this.app);
    new opcionParametroRoute(this.app);
    new parametroRoute(this.app);
    new placaRoute(this.app);
    new tipoBloqueRoute(this.app);
    new tipoConexionRoute(this.app);
    new tipoDatoRoute(this.app);
  }
  async connectDB() {
    try {
      await db.sequelize.sync({ alter: true })
      console.log("Conexión a la base de datos exitosa");
      const tables = await db.sequelize.getQueryInterface().showAllTables();
      console.log("Tablas en la base de datos:", tables);
    } catch (err) {
      console.error("Error al conectar a la base de datos");
    }
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
const server = new Server();
server.start();
