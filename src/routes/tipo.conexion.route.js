const express = require("express");
const tipoConexionController = require("../controllers/tipo.conexion.controller");
const verifyToken = require("../middleware/auth.js");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
class TipoConexionRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new tipoConexionController();
        this.registerRoutes();
        app.use("/extensions/type/connection", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_tipo_conexion"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_tipo_conexion"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_tipo_conexion",
            verifyToken,
            checkPermisosDesdeRoles(["leer_tipo_conexion"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_tipo_conexion",
            verifyToken,
            checkPermisosDesdeRoles(["editar_tipo_conexion"]),
            this.controller.put.bind(this.controller)
        )
    }
}
module.exports = TipoConexionRoutes;