const express = require("express");
const placaController = require("../controllers/placa.controller");
const verifyToken = require("../middleware/auth.js");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
class PlacaRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new placaController();
        this.registerRoutes();
        app.use("/extension/plate", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_placa"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_placa"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_placa",
            verifyToken,
            checkPermisosDesdeRoles(["leer_placa"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_placa",
            verifyToken,
            checkPermisosDesdeRoles(["editar_placa"]),
            this.controller.put.bind(this.controller)
        )
    }
}
module.exports = PlacaRoutes;