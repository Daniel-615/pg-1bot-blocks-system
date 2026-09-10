const express = require("express")
const extensionController = require("../controllers/extension.controller");
const verifyToken = require("../middleware/auth.js");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
class ExtensionRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new extensionController();
        this.registerRoutes();
        app.use("/extensions/extension", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_extension"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_extension"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_extension",
            verifyToken,
            checkPermisosDesdeRoles(["leer_extension"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_extension",
            verifyToken,
            checkPermisosDesdeRoles(["editar_extension"]),
            this.controller.put.bind(this.controller)
        )
    }
}
module.exports = ExtensionRoutes;
