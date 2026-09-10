const express = require("express");
const tipoBloqueController = require("../controllers/tipo.bloque.controller");
const verifyToken = require("../middleware/auth.js");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
class TipoBloqueRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new tipoBloqueController();
        this.registerRoutes();
        app.use("/extensions/type/block", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_tipo_bloque"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_tipo_bloque"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_tipo_bloque",
            verifyToken,
            checkPermisosDesdeRoles(["leer_tipo_bloque"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_tipo_bloque",
            verifyToken,
            checkPermisosDesdeRoles(["editar_tipo_bloque"]),
            this.controller.put.bind(this.controller)
        )
    }
}
module.exports = TipoBloqueRoutes;