const db = require("../models");
const formaBloque = db.getModel("FormaBloque");
class FormaBloqueService {
    async get() {
        try {
            const forma_bloque = await formaBloque.findAll({
                order: [["nombre", "ASC"]]
            });
            if (!forma_bloque) {
                return {
                    ok: false,
                    message: "No se encontró ninguna forma de bloque"
                }
            }
            return {
                ok: true,
                message: "Formas de bloque encontradas exitosamente",
                data: forma_bloque
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al retornar la forma del bloque"
            }
        }

    }
    async getById(id_forma_bloque) {
        try {
            const forma_bloque = await formaBloque.findOne({
                where: id_forma_bloque
            })
            if (!forma_bloque) {
                return {
                    ok: false,
                    message: "No se pudo encontrar la forma bloque"
                }
            }
            return {
                ok: true,
                message: "Se encontró la forma del bloque",
                data: forma_bloque
            }

        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener la forma bloque"
            }
        }
    }
    async create(nombre) {
        try {
            const forma_bloque = await formaBloque.create({
                nombre
            })
            if (!forma_bloque) {
                return {
                    ok: false,
                    message: "Error al crear la forma del bloque"
                }
            }
            return {
                ok: true,
                message: "Forma del bloque creada exitosamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async put(id_forma_bloque, nombre) {
        try {
            const forma_bloque = await formaBloque.findByPk(id_forma_bloque);
            if (!forma_bloque) {
                return {
                    ok: false,
                    message: "No se ha encontrado la forma del bloque"
                }
            }
            const new_forma_bloque = await forma_bloque.update({
                nombre
            })
            return {
                ok: true,
                message: "Forma del bloque actualizada exitosamente",
                data: new_forma_bloque
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
}
module.exports = new FormaBloqueService();
