const express = require("express")
const opcionParametroController = require("../controllers/opcion.parametro.controller");
const verifyToken = require("../middleware/auth.js");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
class OpcionParametroRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new opcionParametroController();
        this.registerRoutes();
        app.use("/extensions/option/parameter", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_opcion_parametro"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_opcion_parametro"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_opcion_parametro",
            verifyToken,
            checkPermisosDesdeRoles(["leer_opcion_parametro"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_opcion_parametro",
            verifyToken,
            checkPermisosDesdeRoles(["editar_opcion_parametro"]),
            this.controller.put.bind(this.controller)
        )
    }
}
module.exports = OpcionParametroRoutes;