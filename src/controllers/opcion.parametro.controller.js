class OpcionParametroController {
    constructor() {
        this.opcionParametroService = require("../services/opcion.parametro.service")
        if (!this.opcionParametroService) {
            console.error("No se pudo importar el servicio de opción-parametro")
        }
    }
    async get(req, res) {
        try {
            const result = await this.opcionParametroService.get();
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
            id_opcion_parametro
        } = req.params;
        if (!id_opcion_parametro) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_opcion_parametro' falta en la url"
                })
        }
        try {
            const result = await this.opcionParametroService.getById(id_opcion_parametro)
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
            id_parametro,
            etiqueta,
            valor,
            orden
        } = req.body;
        if (!id_parametro || !etiqueta || !valor || !orden) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'id_parametro', 'etiqueta', 'valor', 'orden'"
                })
        }
        try {
            const result = await this.opcionParametroService.create(id_parametro, etiqueta, valor, orden)
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
            id_parametro,
            etiqueta,
            valor,
            orden
        } = req.body;
        if (!id_parametro || !etiqueta || !valor || !orden) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'id_parametro', 'etiqueta', 'valor', 'orden'"
                })
        }
        const {
            id_opcion_parametro
        } = req.params;
        if (!id_opcion_parametro) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta 'id_opcion_parametro' en la url"
                })
        }
        try {
            const result = await this.opcionParametroService.put(id_opcion_parametro, id_parametro, etiqueta, valor, orden)
            if (!result.ok) {
                return res
                    .status(404)
                    .json({
                        ok: result.ok,
                        message: result.message,
                        data: result.data
                    })
            }
        } catch (err) {
            return res
                .status(500)
                .json({
                    ok: false,
                    message: "Error interno del servidor"
                })
        }
    }
    async deactivate(req, res) {
        const {
            id_opcion_parametro
        } = req.params;
        if (!id_opcion_parametro) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_opcion_parametro' falta en la url"
                })
        }
        try {
            const result = await this.opcionParametroService.deactivate(id_opcion_parametro)
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
}
module.exports = OpcionParametroController;