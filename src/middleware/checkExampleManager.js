function isExampleManager(req, res, next) {
    const roles = Array.isArray(req.user?.rol) ? req.user.rol : [req.user?.rol];
    const normalizedRoles = roles
        .filter(Boolean)
        .map((role) => String(role).trim().toLowerCase().replace(/[\s_-]+/g, ''));

    if (!normalizedRoles.some((role) => ['admin', '1botpersonal'].includes(role))) {
        return res.status(403).json({
            ok: false,
            message: 'Solo admin y 1botpersonal pueden administrar ejemplos.',
        });
    }

    next();
}

module.exports = isExampleManager;
