class TipoDatoController {
    constructor() {
        this.tipoDatoService = require("../services/tipo.dato.service");
        if (!this.tipoDatoService) {
            console.error("No se pudo importar el servicio de tipo-dato")
        }
    }
    async get(req, res) {
        try {
            const result = await this.tipoDatoService.get();
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
            id_tipo_dato
        } = req.params;
        if (!id_tipo_dato) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_tipo_dato' falta en la url"
                })
        }
        try {
            const result = await this.tipoDatoService.getById(id_tipo_dato)
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
            const result = this.tipoDatoService.create(nombre);
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
                    ok: result.ok,
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
            id_tipo_dato
        } = req.params;
        if (!nombre) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre'"
                })
        }
        if (!id_tipo_dato) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta 'id_tipo_dato' en la url"
                })
        }
        try {
            const result = await this.tipoDatoService.put(id_tipo_dato, nombre);
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
module.exports = TipoDatoController;