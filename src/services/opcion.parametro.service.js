const db = require("../models");
const opcionParametro = db.getModel("OpcionParametro");
const Parametro = db.getModel("Parametro");
class OpcionParametroService {
    async get() {
        try {
            const opcion_parametro = await opcionParametro.findAll({
                where: {
                    activo: true
                },
                include: [
                    {
                        model: Parametro,
                        as: "parametro"
                    }
                ]
            })
            if (!opcion_parametro) {
                return {
                    ok: false,
                    message: "No se encontró ninguna opción del parámetro"
                }
            }
            return {
                ok: true,
                message: "Opciones del parámetro encontradas exitosamente",
                data: opcion_parametro
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al retornar la opción del parámetro"
            }
        }
    }
    async getById(id_opcion_parametro) {
        try {
            const opcion_parametro = await opcionParametro.findOne({
                where: id_opcion_parametro,
                activo: true
            })
            if (!opcion_parametro) {
                return {
                    ok: false,
                    message: "No se pudo encontrar la opción del parámetro"
                }
            }
            return {
                ok: true,
                message: "Se encontró la opción del parámetro",
                data: opcion_parametro
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error la obtener la opción del parámetro"
            }
        }
    }
    async create(id_parametro, etiqueta, valor, orden) {
        try {
            const parametro = await Parametro.findByPk(id_parametro)
            if (!parametro) {
                return {
                    ok: false,
                    message: "El parámetro no existe"
                }
            }
            const opcion_parametro = await opcionParametro.create({
                id_parametro,
                etiqueta,
                valor,
                orden
            })
            if (!opcion_parametro) {
                return {
                    ok: false,
                    message: "Error al crear la opción del parámetro"
                }
            }
            return {
                ok: true,
                message: "Opción del parámetro creada exitosamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async put(id_opcion_parametro, id_parametro, etiqueta, valor, orden) {
        try {
            const opcion_parametro = await opcionParametro.findOne({
                where: {
                    id_opcion_parametro,
                    activo: true
                }
            });
            if (!id_opcion_parametro) {
                return {
                    ok: false,
                    message: "No se encontró la opción del parámetro"
                }
            }
            const parametro = await Parametro.findByPk(id_parametro);
            if (!parametro) {
                return {
                    ok: false,
                    message: "No se encontró el parámetro"
                }
            }
            const new_opcion_parametro = await opcion_parametro.update({
                id_parametro: parametro.id_parametro,
                etiqueta,
                valor,
                orden
            })
            return {
                ok: true,
                message: "Opción del parámetro actualizada exitosamente",
                data: new_opcion_parametro
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async deactivate(id_opcion_parametro) {
        try {
            const opcion_parametro = await opcionParametro.findOne({
                where: {
                    id_opcion_parametro,
                    activo: true
                }
            })
            if (!opcion_parametro) {
                return {
                    ok: false,
                    message: "No se pudo encontrar la opción parámetro"
                }
            }
            opcion_parametro.activo = false
            opcion_parametro.save()
            return {
                ok: true,
                message: "Opción parámetro eliminado correctamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
}
module.exports = new OpcionParametroService();