const db = require("../models")
const extension = db.getModel("Extension");
class ExtensionController {
    constructor() {
        this.extensionService = require("../services/extension.service")
        if (!this.extensionService) {
            console.error("No se pudo importar el servicio extension")
        }
    }
    async get(req, res) {
        try {
            const result = await this.extensionService.get();
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
            id_extension
        } = req.params;
        if (!id_extension) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_extension' falta en la url"
                })
        }
        try {
            const result = await this.extensionService.getById(id_extension)
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
                    message: "Error interno del servidor "
                })
        }
    }
    async create(req, res) {
        const {
            nombre,
            descripcion,
            version,
            id_usuario,
            id_estado_extension
        } = req.body;
        if (!nombre || !version || !id_usuario || !id_estado_extension) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre', 'version', 'id_usuario', 'id_estado_extension'"
                })
        }
        try {
            const result = await this.extensionService.create(nombre, descripcion, version, id_usuario, id_estado_extension)
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
            nombre,
            descripcion,
            version,
            id_estado_extension
        } = req.body;
        if (!nombre || !version || !id_estado_extension) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre'"
                })
        }
        const {
            id_extension
        } = req.params;
        if (!id_extension) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta el 'id_extension' en la url"
                })
        }
        try {
            const result = await this.extensionService.put(id_extension, nombre, descripcion, version, id_estado_extension)
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
module.exports = ExtensionController;
