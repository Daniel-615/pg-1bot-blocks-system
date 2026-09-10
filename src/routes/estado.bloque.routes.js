const express = require("express");
const estadoBloqueController = require("../controllers/estado.bloque.controller");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
const verifyToken = require("../middleware/auth.js");
class EstadoBloqueRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new estadoBloqueController();
        this.registerRoutes();
        app.use("/extensions/status/block", this.router)
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_estado_bloque"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_estado_bloque"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_estado_bloque",
            verifyToken,
            checkPermisosDesdeRoles(["leer_estado_bloque"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_estado_bloque",
            verifyToken,
            checkPermisosDesdeRoles(["editar_estado_bloque"]),
            this.controller.put.bind(this.controller)
        )
    }
}
module.exports = EstadoBloqueRoutes;