class CategoriaController {
    constructor() {
        this.categoriaService = require("../services/categoria.service");
        if (!this.categoriaService) {
            console.error("No se pudo importar el servicio categoria")
        }
    }
    async get(req, res) {
        try {
            const result = await this.categoriaService.get();
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
            id_categoria
        } = req.params;
        if (!id_categoria) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_categoria' falta en la url"
                })
        }
        try {
            const result = await this.categoriaService.getById(id_categoria)
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
            descripcion
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
            const result = await this.categoriaService.create(nombre, descripcion)
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
                .json("Error interno del servidor")
        }
    }
    async put(req, res) {
        const {
            nombre,
            descripcion
        } = req.body;
        if (!nombre) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre"
                })
        }
        const {
            id_categoria
        } = req.params;
        if (!id_categoria) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta el 'id_categoria' en la url"
                })
        }
        try {
            const result = await this.categoriaService.put(id_categoria, nombre, descripcion)
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
module.exports = CategoriaController;