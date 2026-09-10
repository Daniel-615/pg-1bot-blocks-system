const db = require("../models")
const TipoDato = db.getModel("TipoDato");
class TipoDatoService {
    async get() {
        try {
            const tipo_dato = await TipoDato.findAll();
            if (!tipo_dato) {
                return {
                    ok: false,
                    message: "No se encontraron tipos de datos"
                }
            }
            return {
                ok: true,
                message: "Tipos de dato obtenidos exitosamente",
                data: tipo_dato
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al retornar el tipo de dato"
            }
        }
    }
    async getById(id_tipo_dato) {
        try {
            const tipo_dato = await TipoDato.findOne({
                where: id_tipo_dato
            })
            if (!tipo_dato) {
                return {
                    ok: false,
                    message: "No se pudo encontrar el tipo de dato"
                }
            }
            return {
                ok: true,
                message: "Tipo de dato encontrado exitosamente",
                data: tipo_dato
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener el tipo de dato"
            }
        }
    }
    async create(nombre) {
        try {
            const tipo_dato = TipoDato.create({
                nombre
            })
            if (!tipo_dato) {
                return {
                    ok: false,
                    message: "No se pudo crear el tipo-dato"
                }
            }
            return {
                ok: true,
                message: "Tipo-dato creado exitosamente"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
    async put(id_tipo_dato, nombre) {
        const tipo_dato = TipoDato.findByPk(id_tipo_dato)
        if (!tipo_dato) {
            return {
                ok: false,
                message: "Tipo de dato no encontrado"
            }
        }
        const new_tipo_dato = tipo_dato.update({
            nombre
        })
        if (!new_tipo_dato) {
            return {
                ok: false,
                message: "No se pudo actualizar el tipo de dato"
            }
        }
        return {
            ok: true,
            message: "Tipo de dato actualizado correctamente",
            data: new_tipo_dato
        }
    }
}
module.exports = new TipoDatoService();