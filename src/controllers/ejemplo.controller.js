const db = require('../models');
const Ejemplo = db.getModel('Ejemplo');

function toResponse(example) {
    return {
        id: example.id_ejemplo,
        nombre: example.nombre,
        descripcion: example.descripcion,
        placa: example.placa,
        dificultad: example.dificultad,
        icono: example.icono,
        workspace: example.workspace,
        createdAt: example.createdAt,
    };
}

function validatePayload(body) {
    if (typeof body.nombre !== 'string' || !body.nombre.trim() || typeof body.placa !== 'string' || !body.placa.trim() || !body.workspace || typeof body.workspace !== 'object') {
        return 'nombre, placa y workspace son obligatorios.';
    }
    if (body.nombre.length > 120 || (body.descripcion && (typeof body.descripcion !== 'string' || body.descripcion.length > 500))) {
        return 'El nombre o la descripción son demasiado largos.';
    }
    const hasContentBlock = (value) => {
        if (Array.isArray(value)) return value.some(hasContentBlock);
        if (!value || typeof value !== 'object') return false;
        if (value.type && value.type !== 'program_start') return true;
        return Object.values(value).some(hasContentBlock);
    };
    if (!hasContentBlock(body.workspace)) return 'El ejemplo debe contener al menos un bloque.';
    return null;
}

class EjemploController {
    async get(_req, res) {
        const examples = await Ejemplo.findAll({ order: [['createdAt', 'DESC']] });
        return res.json({ ok: true, data: examples.map(toResponse) });
    }

    async create(req, res) {
        const validationError = validatePayload(req.body);
        if (validationError) return res.status(400).json({ ok: false, message: validationError });

        const example = await Ejemplo.create({
            nombre: String(req.body.nombre).trim(),
            descripcion: req.body.descripcion ? String(req.body.descripcion).trim() : null,
            placa: String(req.body.placa).trim(),
            dificultad: req.body.dificultad || 'beginner',
            icono: req.body.icono || '📘',
            workspace: req.body.workspace,
            id_usuario: req.user?.id || null,
        });
        return res.status(201).json({ ok: true, data: toResponse(example) });
    }

    async remove(req, res) {
        const deleted = await Ejemplo.destroy({ where: { id_ejemplo: req.params.id_ejemplo } });
        if (!deleted) return res.status(404).json({ ok: false, message: 'Ejemplo no encontrado.' });
        return res.json({ ok: true });
    }
}

module.exports = EjemploController;
