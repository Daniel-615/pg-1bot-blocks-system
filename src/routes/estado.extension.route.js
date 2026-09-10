const express = require("express");
const controller = require("../controllers/estado.extension.controller");
const verifyToken = require("../middleware/auth.js");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");

class EstadoExtensionRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new controller();
        this.router.get("/", verifyToken, checkPermisosDesdeRoles(["leer_extension"]), this.controller.get.bind(this.controller));
        app.use("/extensions/status/extension", this.router);
    }
}

module.exports = EstadoExtensionRoutes;
