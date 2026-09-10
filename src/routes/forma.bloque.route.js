const express = require("express")
const formaBloqueController = require("../controllers/forma.bloque.controller");
const verifyToken = require("../middleware/auth.js");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
class FormaBloqueRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new formaBloqueController();
        this.registerRoutes();
        app.use("/extensions/shape/block", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_forma_bloque"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_forma_bloque"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_forma_bloque",
            verifyToken,
            checkPermisosDesdeRoles(["leer_forma_bloque"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_forma_bloque",
            verifyToken,
            checkPermisosDesdeRoles(["editar_forma_bloque"]),
            this.controller.put.bind(this.controller)
        )
    }
}
module.exports = FormaBloqueRoutes;