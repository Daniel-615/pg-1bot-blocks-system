const db = require("../models")
const EstadoBloque = db.getModel("EstadoBloque")
class EstadoBloqueController {
    constructor() {
        this.estadoBloqueService = require("../services/estado.bloque.service")
        if (!this.estadoBloqueService) {
            console.error("No se pudo importar el servicio estado-bloque")
        }
    }
    async get(req, res) {
        try {
            const result = await this.estadoBloqueService.get()
            if (!result.ok) {
                return res
                    .status(404)
                    .json({
                        ok: result.ok,
                        message: result.message
                    })
            }
            return res
                .status(200)
                .json({
                    ok: result.ok,
                    message: result.message,
                    data: result.data
                })
        } catch (err) {
            return res
                .status(500)
                .json({
                    ok: false,
                    message: "Error interno del servidor"
                })
        }
    }
    async getById(req, res) {
        const {
            id_estado_bloque
        } = req.params;
        if (!id_estado_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_estado_bloque' falta en la url"
                })
        }
        try {
            const result = await this.estadoBloqueService.getById(id_estado_bloque)
            if (!result.ok) {
                return res
                    .status(404)
                    .json({
                        ok: result.ok,
                        message: result.message
                    })
            }
            return res
                .status(200)
                .json({
                    ok: result.ok,
                    message: result.message,
                    data: result.data
                })
        } catch (err) {
            return res
                .status(500)
                .json({
                    ok: false,
                    message: "Error interno del servidor"
                })
        }
    }
    async create(req, res) {
        const { nombre } = req.body;
        if (!nombre) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre'"
                })
        }
        try {
            const result = await this.estadoBloqueService.create(nombre)
            if (!result.ok) {
                return res
                    .status(500)
                    .json({
                        ok: false,
                        message: result.message
                    })
            }
            return res
                .status(201)
                .json({
                    ok: true,
                    message: result.message
                })
        } catch (err) {
            return res
                .status(500)
                .json({
                    ok: false,
                    message: "Error interno del servidor"
                })
        }
    }
    async put(req, res) {
        const {
            nombre
        } = req.body;
        const {
            id_estado_bloque
        } = req.params;
        if (!nombre) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre'"
                })
        }
        if (!id_estado_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta 'id_estado_bloque' en la url"
                })
        }
        try {
            const result = await this.estadoBloqueService.put(id_estado_bloque, nombre)
            if (!result.ok) {
                return res
                    .status(404)
                    .json({
                        ok: result.ok,
                        message: result.message
                    })
            }
            return res
                .status(200)
                .json({
                    ok: result.ok,
                    message: result.message,
                    data: result.data
                })
        } catch (err) {
            return res
                .status(500)
                .json({
                    ok: false,
                    message: "Error interno del servidor"
                })
        }
    }
}
module.exports = EstadoBloqueController;
