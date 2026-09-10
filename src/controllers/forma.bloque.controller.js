class FormaBloqueController {
    constructor() {
        this.formaBloque = require("../services/forma.bloque.service")
        if (!this.formaBloque) {
            console.error("No se pudo importar el servicio de forma-bloque")
        }
    }
    async get(req, res) {
        try {
            const result = await this.formaBloque.get();
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
            id_forma_bloque
        } = req.params;
        if (!id_forma_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_forma_bloque' falta en la url"
                })
        }
        try {
            const result = await this.formaBloque.getById(id_forma_bloque)
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
            const result = await this.formaBloque.create(nombre);
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
            id_forma_bloque
        } = req.params;
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
        if (!id_forma_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta 'id_forma_bloque' en la url"
                })
        }
        try {
            const result = await this.formaBloque.put(id_forma_bloque, nombre)
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
module.exports = FormaBloqueController;
