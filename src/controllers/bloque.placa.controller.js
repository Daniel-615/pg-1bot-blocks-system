class BloquePlacaController {
    constructor() {
        this.bloquePlacaService = require("../services/bloque.placa.service");
        if (!this.bloquePlacaService) {
            console.error("No se pudo importar el servicio bloque-placa")
        }
    }
    async get(req,res) {
        try {
            const result = await this.bloquePlacaService.get();
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
            id_bloque_placa
        } = req.params;
        if (!id_bloque_placa) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta 'id_bloque_placa' en la url"
                })
        }
        try {
            const result = await this.bloquePlacaService.getById(id_bloque_placa)
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
            id_placa,
            codigo_generado,
            codigo_setup,
            codigo_loop,
            librerias_requeridas
        } = req.body;
        if (!id_bloque || !id_placa || !codigo_generado || !librerias_requeridas) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'id_bloque', 'id_placa', 'codigo_generado', 'librerias_requeridas'"
                })
        }
        try {
            const result = await this.bloquePlacaService.create(id_bloque, id_placa, codigo_generado, codigo_setup, codigo_loop, librerias_requeridas)
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
            codigo_generado,
            codigo_loop,
            codigo_setup,
            librerias_requeridas
        } = req.body;
        const {
            id_bloque_placa
        } = req.params;
        if (!codigo_generado || !codigo_loop || !codigo_setup || !librerias_requeridas) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'codigo_generado', 'codigo_loop', 'codigo_setup', 'librerias_requeridas'"
                })
        }
        if (!id_bloque_placa) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_bloque_placa' requerido en la url"
                })
        }
        try {
            const result = await this.bloquePlacaService.put(id_bloque_placa, codigo_generado, codigo_loop, codigo_setup, librerias_requeridas)
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
            id_bloque_placa
        } = req.params;
        if (!id_bloque_placa) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'id_bloque_placa' requerido en la url"
                })
        }
        try {
            const result = await this.bloquePlacaService.deactive(id_bloque_placa)
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
module.exports = BloquePlacaController;