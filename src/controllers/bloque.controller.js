class BloqueController {
    constructor() {
        this.bloqueService = require("../services/bloque.service")
        if (!this.bloqueService) {
            console.error("No se pudo importar el servicio bloque")
        }
    }
    async get(req, res) {
        try {
            const result = await this.bloqueService.get();
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
                .json(
                    {
                        ok: false,
                        message: "Error interno del servidor"
                    }
                )
        }
    }
    async getById(req, res) {
        const {
            id_bloque
        } = req.params;
        if (!id_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta 'id_bloque' en la url"
                })
        }
        try {
            const result = await this.bloqueService.getById(id_bloque)
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
            nombre,
            descripcion,
            id_tipo_bloque,
            id_extension,
            id_estado_bloque,
            orden
        } = req.body;
        if (!nombre || !id_tipo_bloque || !id_extension || !id_estado_bloque || !orden) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre', 'id_tipo_bloque, 'id_extension', 'id_estado_bloque', 'orden'"
                })
        }

        try {
            const result = await this.bloqueService.create(nombre, descripcion, id_tipo_bloque, id_extension, id_estado_bloque, orden)
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
    async put(req, res) {
        const {
            descripcion,
            nombre,
            orden
        } = req.body;
        if (!nombre || !orden) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre' 'orden'"
                })
        }
        const {
            id_bloque
        } = req.params;
        if (!id_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "El id del bloque no viene dentro de la ruta"
                })
        }
        try {
            const result = await this.bloqueService.put(id_bloque, descripcion, nombre, orden)
            if (!result.ok) {
                return res
                    .status(404)
                    .json({
                        ok: result.ok,
                        message: result.message,
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
module.exports = BloqueController;