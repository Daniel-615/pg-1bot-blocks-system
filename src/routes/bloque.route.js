const express = require("express")
const bloqueController = require("../controllers/bloque.controller");
const { checkPermisosDesdeRoles } = require("../middleware/checkRole.js");
const verifyToken = require("../middleware/auth.js");
class BloqueRoutes {
    constructor(app) {
        this.router = express.Router();
        this.controller = new bloqueController();
        this.registerRoutes();
        app.use("/extensions/blocks", this.router);
    }
    registerRoutes() {
        this.router.post("/", 
            verifyToken,
            checkPermisosDesdeRoles(["crear_bloque"]),
            this.controller.create.bind(this.controller)
        );

        this.router.get("/", 
            verifyToken,
            checkPermisosDesdeRoles(["leer_bloque"]),
            this.controller.get.bind(this.controller)
        );

        this.router.get("/:id_bloque", 
            verifyToken,
            checkPermisosDesdeRoles(["leer_bloque"]),
            this.controller.getById.bind(this.controller)
        );

        this.router.put("/:id_bloque", 
            verifyToken,
            checkPermisosDesdeRoles(["editar_bloque"]),
            this.controller.put.bind(this.controller)
        );
    }
}
module.exports = BloqueRoutes;