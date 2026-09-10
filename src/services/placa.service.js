const db = require("../models");
const Placa = db.getModel("Placa");
class PlacaService {
    async get() {
        try {
            const placa = await Placa.findAll()
            if (!placa) {
                return {
                    ok: false,
                    message: "No se encontraron placas"
                }
            }
            return {
                ok: true,
                message: "Placas encontradas exitosamente",
                data: placa
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al retornar la placa"
            }
        }
    }
    async getById(id_placa) {
        try {
            const placa = await Placa.findOne({
                where: id_placa
            })
            if (!placa) {
                return {
                    ok: false,
                    message: "No se pudo encontrar la placa"
                }
            }
            return {
                ok: true,
                message: "Se encontró la placa exitosamente",
                data: placa
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener la placa"
            }
        }
    }
    async create(nombre, descripcion) {
        try {
            const placa = await Placa.create({
                nombre, descripcion
            })
            if (!placa) {
                return {
                    ok: false,
                    message: "Error al crear la placa"
                }
            }
            return {
                ok: true,
                message: "Placa creada exitosamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async put(id_placa, nombre, descripcion) {
        try {
            const placa = await Placa.findByPk(id_placa)
            if (!placa) {
                return {
                    ok: false,
                    message: "Placa no encontrada"
                }
            }
            const new_placa = await placa.update({
                nombre,
                descripcion
            })
            if (!new_placa) {
                return {
                    ok: false,
                    message: "Error al actualizar la placa"
                }
            }
            return {
                ok: true,
                message: "Placa actualizada exitosamente",
                data: new_placa
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
}
module.exports = new PlacaService();