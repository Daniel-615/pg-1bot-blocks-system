const db = require("../models");
const ConexionBloque = db.getModel("ConexionBloque")
const Bloque = db.getModel("Bloque")
const TipoConexion = db.getModel("TipoConexion")
class ConexionBloqueService {
    async get() {
        try {
            const conexion_bloque = await ConexionBloque.findAll({
                include: [
                    {
                        model: Bloque,
                        as: "bloque"
                    },
                    {
                        model: TipoConexion,
                        as: "tipo_conexion"
                    }
                ]
            })
            if (!conexion_bloque) {
                return {
                    ok: false,
                    message: "No se encontró ninguna Conexion-Bloque"
                }
            }
            return {
                ok: true,
                message: "Conexion-Bloque encontradas exitosamente",
                data: conexion_bloque
            }
        } catch (err) {
            console.error(err.message)
            return {
                ok: false,
                message: "Error al retornar la conexión del bloque"
            }
        }
    }
    async getById(id_conexion_bloque) {
        try {
            const conexion_bloque = await ConexionBloque.findOne({
                where: id_conexion_bloque
            })
            if (!conexion_bloque) {
                return {
                    ok: false,
                    message: "Conexión bloque no encontrada"
                }
            }
            return {
                ok: true,
                message: "Conexión bloque encontrada",
                data: conexion_bloque
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener conexión-bloque"
            }
        }
    }
    async create(id_bloque, id_tipo_conexion, nombre, orden) {
        const bloque = await Bloque.findByPk(id_bloque)
        if (!bloque) {
            return {
                ok: false,
                message: "El bloque no existe"
            }
        }
        const tipo_conexion = await TipoConexion.findByPk(id_tipo_conexion)
        if (!tipo_conexion) {
            return {
                ok: false,
                message: "El tipo de conexión no existe"
            }
        }
        try {
            const conexion_bloque = await ConexionBloque.create({
                id_bloque,
                id_tipo_conexion,
                nombre,
                orden
            })
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async put(id_conexion_bloque, nombre, orden) {
        try {
            const conexion_bloque = await ConexionBloque.findByPk(id_conexion_bloque)
            if (!conexion_bloque) {
                return {
                    ok: false,
                    message: "No se encontró la conexión del bloque"
                }
            }
            const new_conexion_bloque = await conexion_bloque.update({
                nombre,
                orden
            })
            if (!new_conexion_bloque) {
                return {
                    ok: false,
                    message: "Error al actualizar la conexión del bloque"
                }
            }
            return {
                ok: true,
                message: "Conexión del bloque actualizada exitosamente",
                data: new_conexion_bloque
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al actualizar la conexión del bloque"
            }
        }
    }
}
module.exports = new ConexionBloqueService();