const db = require("../models");
const TipoConexion = db.getModel("TipoConexion");
class TipoConexionService {
    async get() {
        try {
            const tipo_conexion = await TipoConexion.findAll();
            if (!tipo_conexion) {
                return {
                    ok: false,
                    message: "No se encontraron tipos de conexión"
                }
            }
            return {
                ok: true,
                message: "Tipo de conexión obtenidos exitosamente",
                data: tipo_conexion
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al retornar el tipo de conexión"
            }
        }
    }
    async getById(id_tipo_conexion) {
        try {
            const tipo_conexion = TipoConexion.findOne({
                where: id_tipo_conexion
            })
            if (!tipo_conexion) {
                return {
                    ok: false,
                    message: "No se pudo encontrar el tipo de conexión"
                }
            }
            return {
                ok: true,
                message: "Tipo de conexión encontrado exitosamente",
                data: tipo_conexion
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener el tipo de conexión"
            }
        }
    }
    async create(nombre) {
        try {
            const tipo_conexion = await TipoConexion.create({
                nombre
            });
            if (!tipo_conexion) {
                return {
                    ok: false,
                    message: "Error al crear el tipo de conexión"
                };
            }
            return {
                ok: true,
                message: "Tipo de conexión creado exitosamente"
            };
        } catch (err) {
            console.error("Error al crear tipo de conexión:", err);
            return {
                ok: false,
                message: "Error interno del servidor"
            };
        }
    }
    async put(id_tipo_conexion, nombre) {
        const tipo_conexion = await TipoConexion.findByPk(id_tipo_conexion)
        if (!tipo_conexion) {
            return {
                ok: false,
                message: "Tipo de Conexión no encontrada"
            }
        }
        const new_tipo_conexion = await tipo_conexion.update({
            nombre
        })
        if (!new_tipo_conexion) {
            return {
                ok: false,
                message: "No se pudo actualizar el tipo de conexión"
            }
        }
        return {
            ok: true,
            message: "Tipo de conexión actualizada correctamente",
            data: new_tipo_conexion
        }
    }
}
module.exports = new TipoConexionService();