const express = require("express")
const categoriaController = require("../controllers/categoria.controller")
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js")
const verifyToken = require("../middleware/auth.js")
class CategoriaRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new categoriaController();
        this.registerRoutes();
        app.use("/extensions/category", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_categoria"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_categoria"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_categoria",
            verifyToken,
            checkPermisosDesdeRoles(["leer_categoria"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_categoria",
            verifyToken,
            checkPermisosDesdeRoles(["editar_categoria"]),
            this.controller.put.bind(this.controller)
        )
    }
}
module.exports = CategoriaRoutes;
