const db = require("../models")
const extensionCategoria = db.getModel("ExtensionCategoria")
const Extension = db.getModel("Extension")
const Categoria = db.getModel("Categoria")

class ExtensionCategoriaService {
    async get() {
        try {
            const extension_categoria = await extensionCategoria.findAll(
                {
                    where: {
                        activo: true
                    },
                    include: [
                        {
                            model: db.getModel("Extension"),
                            as: "extension"
                        },
                        {
                            model: db.getModel("Categoria"),
                            as: "categoria"
                        }
                    ]
                }

            );
            if (!extension_categoria) {
                return {
                    ok: false,
                    message: "No se encontró ninguna relación extensión-categoria"
                }
            }
            return {
                ok: true,
                message: "Relaciones extensión-categoria encontradas",
                data: extension_categoria
            }
        } catch (err) {
            console.error(err.message)
            return {
                ok: false,
                message: "Error al retornar la relacion extensión-categoria"
            }
        }
    }
    async getById(id_extension_categoria) {
        try {
            const extension_categoria = await extensionCategoria.findOne({
                where: { id_extension_categoria, activo: true }
            })
            if (!extension_categoria) {
                return {
                    ok: false,
                    message: "Extensión categoria no encontrada"
                }
            }
            return {
                ok: true,
                message: "Extensión categoria encontrada",
                data: extension_categoria
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener la extensión categoria"
            }
        }
    }
    async create(id_extension, id_categoria) {
        try {
            const extension_categoria = await extensionCategoria.create({
                id_extension,
                id_categoria
            })
            if (!extension_categoria) {
                return {
                    ok: false,
                    message: "Error al crear la relación extension-categoria"
                }
            }
            return {
                ok: true,
                message: "Relación extension-categoria creada exitosamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async put(id_extension_categoria, id_extension, id_categoria) {
        try {
            const extension_categoria = await extensionCategoria.findOne({
                where: {
                    id_extension_categoria,
                    activo: true
                }
            })
            if (!extension_categoria) {
                return {
                    ok: false,
                    message: "No se encontró la relación extensión-categoria"
                }
            }
            const extension = await Extension.findByPk(id_extension)
            if (!extension) {
                return {
                    ok: false,
                    message: "La extensión no existe"
                }
            }
            const categoria = await Categoria.findByPk(id_categoria)
            if (!categoria) {
                return {
                    ok: false,
                    message: "La categoria no existe"
                }
            }
            const new_extension_categoria = await extension_categoria.update({
                id_extension: extension.id_extension,
                id_categoria: categoria.id_categoria
            })
            if (!new_extension_categoria) {
                return {
                    ok: false,
                    message: "Error al actualizar la relación extensión-categoria"
                }
            }
            return {
                ok: true,
                message: "Relación extensión-categoria actualizada exitosamente",
                data: new_extension_categoria
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async deactivate(id_extension_categoria) {
        try {
            const extension_categoria = await extensionCategoria.findOne({
                where: {
                    id_extension_categoria,
                    activo: true
                }
            })
            if (!extension_categoria) {
                return {
                    ok: false,
                    message: "No se pudo encontrar la extensión categoría"
                }
            }
            extension_categoria.activo = false
            extension_categoria.save()
            return {
                ok: true,
                message: "Extensión categoría eliminada correctamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
}
module.exports = new ExtensionCategoriaService();
