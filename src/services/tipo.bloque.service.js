const db = require("../models");
const TipoBloque = db.getModel("TipoBloque");
const FormaBloque = db.getModel("FormaBloque");
class TipoBloqueService {
    async get() {
        try {
            const tipo_bloque = await TipoBloque.findAll({
                where: {
                    activo: true
                },
                include: [
                    {
                        model: FormaBloque,
                        as: "forma"
                    }
                ]
            })
            if (!tipo_bloque) {
                return {
                    ok: false,
                    message: "No se encontraron tipos de bloques"
                }
            }
            return {
                ok: true,
                message: "Tipo de bloques obtenidos exitosamente",
                data: tipo_bloque
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al retornar el tipo de bloque"
            }
        }
    }
    async getById(id_tipo_bloque) {
        try {
            const tipo_bloque = await TipoBloque.findOne({
                where: {
                    id_tipo_bloque,
                    activo: true
                }
            })
            if (!tipo_bloque) {
                return {
                    ok: false,
                    message: "No se encontró el tipo del bloque"
                }
            }
            return {
                ok: true,
                message: "Se encontró el tipo del bloque",
                data: tipo_bloque
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener el tipo del bloque"
            }
        }
    }
    async create(nombre, descripcion, color, id_forma_bloque) {
        try {
            const forma_bloque = await FormaBloque.findOne({
                where: {
                    id_forma_bloque,
                    activo: true
                }
            });
            if (!forma_bloque) {
                return {
                    ok: false,
                    message: "La forma del bloque no existe"
                }
            }
            const tipo_bloque = await TipoBloque.create({
                nombre,
                descripcion,
                color,
                id_forma_bloque
            })
            return {
                ok: true,
                message: "Tipo de bloque creado exitosamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async put(id_tipo_bloque, nombre, descripcion, color, id_forma_bloque) {
        try {
            const tipo_bloque = await TipoBloque.findOne({
                where: {
                    id_tipo_bloque,
                    activo: true
                }
            });
            if (!tipo_bloque) {
                return {
                    ok: false,
                    message: "Tipo de bloque no encontrado"
                }
            }
            const forma_bloque = await FormaBloque.findByPk(id_forma_bloque)
            if (!forma_bloque) {
                return {
                    ok: false,
                    message: "La forma del bloque no existe"
                }
            }
            const new_tipo_bloque = await tipo_bloque.update({
                nombre,
                descripcion,
                color,
                id_forma_bloque: forma_bloque.id_forma_bloque
            })
            if (!new_tipo_bloque) {
                return {
                    ok: false,
                    message: "Error al actualizar el tipo de bloque"
                }
            }
            return {
                ok: true,
                message: "Tipo de bloque actualizado exitosamente",
                data: new_tipo_bloque
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    //soft delete
    async deactivate(id_tipo_bloque) {
        try {
            const tipo_bloque = await TipoBloque.findOne({
                where: {
                    id_tipo_bloque,
                    activo: true,
                }
            })
            if (!tipo_bloque) {
                return {
                    ok: false,
                    message: "Tipo bloque no encontrado"
                }
            }
            tipo_bloque.activo = false
            tipo_bloque.save()
            return {
                ok: true,
                message: "Tipo bloque eliminado correctamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
}
module.exports = new TipoBloqueService();