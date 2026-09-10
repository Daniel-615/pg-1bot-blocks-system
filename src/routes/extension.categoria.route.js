const express = require("express")
const extensionCategoriaController = require("../controllers/extension.categoria.controller");
const verifyToken = require("../middleware/auth.js");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
class ExtensionCategoriaRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new extensionCategoriaController();
        this.registerRoutes();
        app.use("/extensions/extension/category", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_extension_categoria"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_extension_categoria"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_extension_categoria",
            verifyToken,
            checkPermisosDesdeRoles(["leer_extension_categoria"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_extension_categoria",
            verifyToken,
            checkPermisosDesdeRoles(["editar_extension_categoria"]),
            this.controller.put.bind(this.controller)
        )
        this.router.put(
            "/deactivate/:id_extension_categoria",
            verifyToken,
            checkPermisosDesdeRoles(["desactivar_extension_categoria"]),
            this.controller.deactivate.bind(this.controller)
        )
    }
}
module.exports = ExtensionCategoriaRoutes;