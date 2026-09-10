class TipoBloqueController {
    constructor() {
        this.tipoBloqueService = require("../services/tipo.bloque.service");
        if (!this.tipoBloqueService) {
            console.error("No se pudo importar el servicio de tipo-bloque")
        }
    }
    async get(req, res) {
        try {
            const result = await this.tipoBloqueService.get();
            if (!result.ok) {
                return res
                    .status(404)
                    .json({
                        ok: false,
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
            id_tipo_bloque
        } = req.params;
        if (!id_tipo_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_tipo_bloque' falta en la url"
                })
        }
        try {
            const result = await this.tipoBloqueService.getById(id_tipo_bloque)
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
            color,
            id_forma_bloque
        } = req.body;
        if (!nombre || !color || !id_forma_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre', 'color', 'id_forma_bloque"
                })
        }
        try {
            const result = await this.tipoBloqueService.create(nombre, descripcion, color, id_forma_bloque);
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
            descripcion,
            color,
            id_forma_bloque
        } = req.body;
        const {
            id_tipo_bloque
        } = req.params;
        if (!nombre || !color || !id_forma_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre', 'color', 'id_forma_bloque'"
                })
        }
        if (!id_tipo_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta 'id_tipo_bloque' en la url"
                })
        }
        try {
            const result = this.tipoBloqueService.put(id_tipo_bloque, nombre, descripcion, color, id_forma_bloque)
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
            id_tipo_bloque
        } = req.params;
        if (!id_tipo_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_tipo_bloque' falta en la url"
                })
        }
        try {
            const result = await this.tipoBloqueService.deactivate(id_tipo_bloque)
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
module.exports = TipoBloqueController;