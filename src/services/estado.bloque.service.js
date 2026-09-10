const db = require("../models")
const EstadoBloque = db.getModel("EstadoBloque")
class EstadoBloqueService {
    async get() {
        try {
            const estado_bloque = await EstadoBloque.findAll();
            if (!estado_bloque) {
                return {
                    ok: false,
                    message: "No se encontró Estado-Bloque"
                }
            }
            return {
                ok: true,
                message: "Estado-Bloque encontrado exitosamente",
                data: estado_bloque
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al retornar el estado del bloque"
            }
        }
    }
    async getById(id_estado_bloque) {
        try {
            const estado_bloque = await EstadoBloque.findOne({
                where: id_estado_bloque
            })
            if (!estado_bloque) {
                return {
                    ok: false,
                    message: "Estado bloque no encontrado"
                }
            }
            return {
                ok: true,
                message: "Estado bloque encontrado",
                data: estado_bloque
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener el estado bloque"
            }
        }
    }
    async create(nombre) {
        try {
            const estado_bloque = await EstadoBloque.create({
                nombre
            })
            if (!estado_bloque) {
                return {
                    ok: false,
                    message: "Error al crear el estado del bloque"
                }
            }
            return {
                ok: true,
                message: "Estado del bloque creado exitosamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async put(id_estado_bloque, nombre) {
        try {
            const estado_bloque = await EstadoBloque.findByPk(id_estado_bloque);
            if (!estado_bloque) {
                return {
                    ok: false,
                    message: "Relación estado bloque no encontrada"
                }
            }
            const new_estado_bloque = estado_bloque.update({
                nombre
            })
            if (!new_estado_bloque) {
                return {
                    ok: false,
                    message: "Error al actualizar el estado del bloque"
                }
            }
            return {
                ok: true,
                message: "Estado del bloque actualizado exitosamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
}
module.exports = new EstadoBloqueService();