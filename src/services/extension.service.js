const db = require("../models");
const extensionModel = db.getModel("Extension")
const estadoExtension = db.getModel("EstadoExtension")
class ExtensionService {
    async get() {
        try {
            const extension = await extensionModel.findAll({
                include: [
                    {
                        model: db.getModel("EstadoExtension"),
                        as: "estado"
                    },
                ]
            })
            return {
                ok: true,
                message: "Se encontraron extensiones exitosamente",
                data: extension
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al retornar la extensión"
            }
        }
    }
    async getById(id_extension) {
        try {
            const extension_obj = await extensionModel.findOne({
                where: { id_extension }
            })
            if (!extension_obj) {
                return {
                    ok: false,
                    message: "No se pudo encontrar la extensión"
                }
            }
            return {
                ok: true,
                message: "Extensión encontrada",
                data: extension_obj
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener la extensión"
            }
        }
    }
    async create(nombre, descripcion, version, id_usuario, id_estado_extension) {
        try {
            const estado_extension = await estadoExtension.findByPk(id_estado_extension)
            if (!estado_extension) {
                return {
                    ok: false,
                    message: "El estado de la extensión no existe"
                }
            }
            const extension = await extensionModel.create({
                nombre,
                descripcion,
                version,
                id_usuario,
                id_estado_extension
            })
            if (!extension) {
                return {
                    ok: false,
                    message: "Error al crear la extensión"
                }
            }
            return {
                ok: true,
                message: "Extensión creada exitosamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async put(id_extension, nombre, descripcion, version, id_estado_extension) {
        try {
            const extension = await extensionModel.findByPk(id_extension)
            if (!extension) {
                return {
                    ok: false,
                    message: "No se pudo encontrar la extensión"
                }
            }
            const estado_extension = await estadoExtension.findByPk(id_estado_extension)
            if (!estado_extension) {
                return {
                    ok: false,
                    message: "El estado de la extensión no existe"
                }
            }

            const new_extension = await extension.update({
                nombre,
                descripcion,
                version,
                id_estado_extension: estado_extension.id_estado_extension
            })
            return {
                ok: true,
                message: "Extensión actualizada exitosamente",
                data: new_extension
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
}
module.exports = new ExtensionService();
