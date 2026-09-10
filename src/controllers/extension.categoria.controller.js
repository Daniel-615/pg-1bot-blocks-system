class ExtensionCategoriaController {
    constructor() {
        this.extensionCategoriaService = require("../services/extension.categoria.service")
        if (!this.extensionCategoriaService) {
            console.error("No se pudo importar el servicio extension-categoria")
        }
    }
    async get(req, res) {
        try {
            const result = await this.extensionCategoriaService.get();
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
                    ok: result.message,
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
            id_extension_categoria
        } = req.params;
        try {
            const result = await this.extensionCategoriaService.getById(id_extension_categoria)
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
            id_extension,
            id_categoria
        } = req.body;
        if (!id_extension || !id_categoria) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'id_extension', 'id_categoria'"
                })
        }
        try {
            const result = await this.extensionCategoriaService.create(id_extension, id_categoria)
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
            id_extension,
            id_categoria
        } = req.body;
        const {
            id_extension_categoria
        } = req.params;
        try {
            const result = await this.extensionCategoriaService.put(id_extension_categoria, id_extension, id_categoria)
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
    async deactivate(req, res) {
        const {
            id_extension_categoria
        } = req.params;
        if (!id_extension_categoria) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_extension_categoria' falta en la url"
                })
        }
        try {
            const result = await this.extensionCategoriaService.deactivate(id_extension_categoria)
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
module.exports = ExtensionCategoriaController;
