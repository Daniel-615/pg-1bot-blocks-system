const express = require("express")
const conexionController = require("../controllers/conexion.bloque.controller")
const verifyToken = require("../middleware/auth.js");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
class ConexionBloqueRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new conexionController();
        this.registerRoutes();
        app.use("/extensions/connection", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_conexion_bloque"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_conexion_bloque"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_conexion_bloque",
            verifyToken,
            checkPermisosDesdeRoles(["leer_conexion_bloque"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_conexion_bloque",
            verifyToken,
            checkPermisosDesdeRoles(["editar_conexion_bloque"]),
            this.controller.put.bind(this.controller)
        )
    }
}
module.exports = ConexionBloqueRoutes;