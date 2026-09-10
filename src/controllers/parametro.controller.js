
class ParametroController {
    constructor() {
        this.parametroService = require("../services/parametro.service");
        if (!this.parametroService) {
            console.error("No se pudo importar el servicio de parámetro")
        }
    }
    async get(req, res) {
        try {
            const result = await this.parametroService.get();
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
            id_parametro
        } = req.params;
        if (!id_parametro) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_parametro' falta en la url"
                })
        }
        try {
            const result = await this.getById(id_parametro)
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
            id_bloque,
            nombre,
            id_tipo_dato,
            requerido,
            orden,
            etiqueta
        } = req.body;
        if (!id_bloque || !nombre || !id_tipo_dato || requerido === undefined|| orden === undefined || !etiqueta) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'id_bloque', 'nombre', 'id_tipo_dato', 'requerido', 'orden', 'etiqueta'"
                })
        }
        try {
            const result = await this.parametroService.create(id_bloque, nombre, id_tipo_dato, requerido, orden, etiqueta)
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
            nombre,
            id_tipo_dato,
            requerido,
            orden,
            etiqueta
        } = req.body;
        if (!nombre || !id_tipo_dato || !requerido || !orden || !etiqueta) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre', 'id_tipo_dato', 'requerido', 'orden', 'etiqueta'"
                })
        }
        const {
            id_parametro
        } = req.params;
        if (!id_parametro) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta 'id_parametro' en la url"
                })
        }
        try {
            const result = await this.parametroService.put(id_parametro, nombre, id_tipo_dato, requerido, orden, etiqueta)
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
module.exports = ParametroController;