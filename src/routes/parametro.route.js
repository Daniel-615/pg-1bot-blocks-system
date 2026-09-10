const express = require("express");
const parametroController = require("../controllers/parametro.controller")
const verifyToken = require("../middleware/auth.js");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
class ParametroRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new parametroController();
        this.registerRoutes();
        app.use("/extensions/parameter", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_parametro"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_parametro"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_parametro",
            verifyToken,
            checkPermisosDesdeRoles(["leer_parametro"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_parametro",
            verifyToken,
            checkPermisosDesdeRoles(["editar_parametro"]),
            this.controller.put.bind(this.controller)
        )
    }
}
module.exports = ParametroRoutes;