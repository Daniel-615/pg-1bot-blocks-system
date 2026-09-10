class TipoConexionController {
    constructor() {
        this.tipoConexionService = require("../services/tipo.conexion.service")
        if (!this.tipoConexionService) {
            console.error("No se pudo importar el servicio tipo-conexion")
        }
    }
    async get(req, res) {
        try {
            const result = await this.tipoConexionService.get();
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
            id_tipo_conexion
        } = req.params;
        if (!id_tipo_conexion) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_tipo_conexion' falta en la url"
                })
        }
        try {
            const result = await this.tipoConexionService.getById(id_tipo_conexion)
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
        const {
            nombre
        } = req.body;
        if (!nombre) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre'"
                })
        }
        try {
            const result = await this.tipoConexionService.create(nombre);
            if (!result.ok) {
                return res
                    .status(500)
                    .json({
                        ok: result.ok,
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
            id_tipo_conexion
        } = req.params;
        if (!nombre) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre'"
                })
        }
        if (!id_tipo_conexion) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta 'id_tipo_conexion' en la url"
                })
        }
        try {
            const result = await this.tipoConexionService.put(id_tipo_conexion, nombre);
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
module.exports = TipoConexionController;