class ConexionBloqueController {
    constructor() {
        this.conexionBloqueService = require("../services/conexion.bloque.service");
        if (!this.conexionBloqueService) {
            console.error("No se pudo importar el servicio conexion-bloque")
        }
    }
    async get(req, res) {
        try {
            const result = await this.conexionBloqueService.get();
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
            id_conexion_bloque
        } = req.params;
        if (!id_conexion_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_conexion_bloque' falta en la url"
                })
        }
        try {
            const result = await this.conexionBloqueService.getById(id_conexion_bloque)
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
            id_tipo_conexion,
            nombre,
            orden
        } = req.body;
        if (!id_bloque || !id_tipo_conexion || !nombre || !orden) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'id_bloque', 'id_tipo_conexion', 'nombre', 'orden'"
                })
        }
        try {
            const result = await this.conexionBloqueService.create(id_bloque, id_tipo_conexion, nombre, orden)
            if (!result.ok) {
                return res
                    .status(500)
                    .json({
                        ok: false,
                        message: result.message,
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
            orden
        } = req.body;
        const {
            id_conexion_bloque
        } = req.params;
        if (!nombre || !orden) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre', 'orden'"
                })
        }
        if (!id_conexion_bloque) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta 'id_conexion_bloque' en la url"
                })
        }
        try {
            const result = await this.conexionBloqueService.put(id_conexion_bloque, nombre, orden);
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
module.exports = ConexionBloqueController;
