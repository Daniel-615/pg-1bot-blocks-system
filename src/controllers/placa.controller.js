class PlacaController {
    constructor() {
        this.placaService = require("../services/placa.service")
        if (!this.placaService) {
            console.error("No se pudo importar el servicio placa")
        }
    }
    async get(req, res) {
        try {
            const result = await this.placaService.get();
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
            id_placa
        } = req.params;
        if (!id_placa) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "'placa' falta en la url"
                })
        }
        try {
            const result = await this.placaService.getById(id_placa)
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
                    message: ersult.message,
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
            const result = await this.placaService.create(nombre, descripcion);
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
            nombre, descripcion
        } = req.body;
        const {
            id_placa
        } = req.params;
        if (!nombre) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos requeridos 'nombre'"
                })
        }
        if (!id_placa) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Falta 'id_placa' en la url"
                })
        }
        try {
            const result = await this.placaService.put(id_placa, nombre, descripcion);
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
module.exports = PlacaController;