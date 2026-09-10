const db = require("../models");
const bloqueModel = db.getModel("Bloque");
const PlacaModel = db.getModel("Placa");
const BloquePlaca = db.getModel("BloquePlaca")
class BloquePlacaService {
    async get() {
        try {
            const bloque_placa = await BloquePlaca.findAll({
                where: {
                    activo: true
                },
                include: [
                    {
                        model: bloqueModel,
                        as: "bloque"
                    },
                    {
                        model: PlacaModel,
                        as: "placa"
                    }
                ]
            });

            return {
                ok: true,
                message: "Bloques-Placa obtenidos exitosamente",
                data: bloque_placa
            };

        } catch (err) {
            console.error("Error al obtener bloques-placa:", err);

            return {
                ok: false,
                message: "Error al retornar los bloques de la placa"
            };
        }
    }
    async getById(id_bloque_placa) {
        try {
            const bloque_placa = await BloquePlaca.findOne({
                where: {
                    id_bloque_placa,
                    activo: true
                }
            })
            if (!bloque_placa) {
                return {
                    ok: false,
                    message: "Bloque placa no encontrada"
                }
            }
            return {
                ok: true,
                message: "Bloque placa encontrada",
                data: bloque_placa
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al obtener el bloque-placa"
            }
        }
    }
    async create(
        id_bloque, id_placa, codigo_generado, codigo_setup, codigo_loop, librerias_requeridas
    ) {
        try {
            const bloque = await bloqueModel.findByPk(id_bloque)
            if (!bloque) {
                return {
                    ok: false,
                    message: "El tipo de Bloque no existe."
                }
            }
            const placa = await PlacaModel.findByPk(id_placa)
            if (!placa) {
                return {
                    ok: false,
                    message: "La placa no existe."
                }
            }
            const bloque_placa = await BloquePlaca.create({
                id_bloque,
                id_placa,
                codigo_generado,
                codigo_setup,
                codigo_loop,
                librerias_requeridas,
            })
            return {
                ok: true,
                message: "Relación bloque placa creada correctamente.",
                data: bloque_placa
            }
        } catch (err) {
            console.error("Error al crear bloque placa: ", err)
            return {
                ok: false,
                message: "Error al crear la relación bloque placa"
            }
        }
    }
    async put(id_bloque_placa, codigo_generado, codigo_loop, codigo_setup, librerias_requeridas) {
        try {
            const bloque_placa = await BloquePlaca.findOne({
                where: {
                    id_bloque_placa,
                    activo: true
                }
            })
            if (!bloque_placa) {
                return {
                    ok: false,
                    message: "No se encontró la relación bloque placa"
                }
            }
            const new_bloque_placa = await bloque_placa.update({
                codigo_generado,
                codigo_loop,
                codigo_setup,
                librerias_requeridas
            })
            if (!new_bloque_placa) {
                return {
                    ok: false,
                    message: "Error al actualizar la relación bloque placa"
                }
            }
            return {
                ok: true,
                message: "Relación bloque placa actualizada exitosamente",
                data: new_bloque_placa
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error al actualizar la relación bloque placa"
            }
        }
    }
    async deactive(id_bloque_placa) {
        try {
            const bloque_placa = await BloquePlaca.findOne({
                where: {
                    id_bloque_placa,
                    activo: true,
                }
            })
            if (!bloque_placa) {
                return {
                    ok: false,
                    message: "No se pudo encontrar el bloque placa"
                }
            }
            bloque_placa.activo = false
            bloque_placa.save()
            return {
                ok: true,
                message: "Se elimino correctamente el bloque placa"
            }
        } catch (err) {
            return {
                ok: false,
                message: "Error interno del servidor"
            }
        }
    }
}
module.exports = new BloquePlacaService();
