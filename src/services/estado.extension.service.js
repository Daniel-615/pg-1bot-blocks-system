const db = require("../models");
const EstadoExtension = db.getModel("EstadoExtension");

class EstadoExtensionService {
    async get() {
        try {
            await EstadoExtension.findOrCreate({ where: { nombre: "Activo" } });
            return { ok: true, message: "Estados de extensión encontrados", data: await EstadoExtension.findAll({ order: [["nombre", "ASC"]] }) };
        } catch (err) {
            return { ok: false, message: "Error al obtener los estados de extensión" };
        }
    }
}

module.exports = new EstadoExtensionService();
