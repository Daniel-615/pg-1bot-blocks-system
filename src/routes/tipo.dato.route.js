const express = require("express");
const tipoDatoController = require("../controllers/tipo.dato.controller");
const verifyToken = require("../middleware/auth.js");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
class TipoDatoRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new tipoDatoController();
        this.registerRoutes();
        app.use("/extensions/type/data", this.router);
    }
    registerRoutes() {
        this.router.post(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["crear_tipo_dato"]),
            this.controller.create.bind(this.controller)
        )
        this.router.get(
            "/",
            verifyToken,
            checkPermisosDesdeRoles(["leer_tipo_dato"]),
            this.controller.get.bind(this.controller)
        )
        this.router.get(
            "/:id_tipo_dato",
            verifyToken,
            checkPermisosDesdeRoles(["leer_tipo_dato"]),
            this.controller.getById.bind(this.controller)
        )
        this.router.put(
            "/:id_tipo_dato",
            verifyToken,
            checkPermisosDesdeRoles(["editar_tipo_dato"]),
            this.controller.put.bind(this.controller)
        )
    }
}
module.exports = TipoDatoRoutes;