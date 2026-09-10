const express = require("express");
const bloquePlacaController = require("../controllers/bloque.placa.controller");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
const verifyToken = require("../middleware/auth.js");
class BloquePlacaRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new bloquePlacaController();
        this.registerRoutes();
        app.use("/extensions/blocks-placa", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_bloque_placa"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_bloque_placa"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_bloque_placa",
            verifyToken,
            checkPermisosDesdeRoles(["leer_bloque_placa"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_bloque_placa",
            verifyToken,
            checkPermisosDesdeRoles(["editar_bloque_placa"]),
            this.controller.put.bind(this.controller)
        )
        this.router.put(
            "/deactivate/:id_bloque_placa",
            verifyToken,
            checkPermisosDesdeRoles(["desactivar_bloque_placa"]),
            this.controller.deactivate.bind(this.controller)
        )
    }
}
module.exports = BloquePlacaRoutes;