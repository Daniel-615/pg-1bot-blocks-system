const db = require("../models");
const Parametro = db.getModel("Parametro");
const Bloque = db.getModel("Bloque");
const TipoDato = db.getModel("TipoDato")
class ParametroService {
    async get() {
        try {
            const parametro = await Parametro.findAll({
                include: [
                    {
                        model: Bloque,
                        as: "bloque"
                    },
                    {
                        model: TipoDato,
                        as: "tipo_dato"
                    },
                ]
            })
            if (!parametro) {
                return {
                    ok: false,
                    message: "No se encontraron parámetros"
                }
            }
            return {
                ok: true,
                message: "Parámetros obtenidos exitosamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al retornar los parámetros"
            }
        }
    }
    async getById(id_parametro) {
        try {
            const parametro = await Parametro.findOne({
                id_parametro
            })
            if (!parametro) {
                return {
                    ok: false,
                    message: "Parámetro no encontrado"
                }
            }
            return {
                ok: true,
                message: "Parámetro encontrado exitosamente",
                data: parametro
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener el parámetro"
            }
        }
    }
    async create(id_bloque, nombre, id_tipo_dato, requerido, orden, etiqueta) {
        try {
            const bloque = await Bloque.findByPk(id_bloque)
            if (!bloque) {
                return {
                    ok: false,
                    message: "El bloque no existe"
                }
            }
            const tipo_dato = await TipoDato.findByPk(id_tipo_dato);
            if (!tipo_dato) {
                return {
                    ok: false,
                    message: "El tipo de dato no existe"
                }
            }
            const parametro = await Parametro.create({
                id_bloque,
                nombre,
                id_tipo_dato,
                requerido,
                orden,
                etiqueta
            })
            return {
                ok: true,
                message: "Parámetro creado exitosamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async put(id_parametro, nombre, id_tipo_dato, requerido, orden, etiqueta) {
        try {
            const parametro = await Parametro.findByPk(id_parametro)
            if (!parametro) {
                return {
                    ok: false,
                    message: "Parámetro no encontrado"
                }
            }
            const tipo_dato = await TipoDato.findByPk(id_tipo_dato)
            if (!tipo_dato) {
                return {
                    ok: false,
                    message: "Tipo de dato no encontrado"
                }
            }
            const new_parametro = await parametro.update({
                nombre,
                id_tipo_dato: tipo_dato.id_tipo_dato,
                requerido,
                orden,
                etiqueta
            })
            if (!new_parametro) {
                return {
                    ok: false,
                    message: "Error al actualizar el parámetro"
                }
            }
            return {
                ok: true,
                message: "Parámetro actualizado exitosamente",
                data: new_parametro
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
}
module.exports = new ParametroService();
