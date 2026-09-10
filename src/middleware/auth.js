const jwt = require('jsonwebtoken');
const { SECRET_JWT_KEY } = require('../config/config.js');

function getCookie(req, name) {
    const cookieHeader = req.headers.cookie || '';
    const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
    const prefix = `${name}=`;
    const cookie = cookies.find((item) => item.startsWith(prefix));

    return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null;
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const token = getCookie(req, 'access_token') || bearerToken;

    if (!token) {
        return res
            .status(403)
            .json({
                ok: false,
                message: "No autorizado, token no encontrado."
            });
    }

    if (!SECRET_JWT_KEY) {
        return res
            .status(500)
            .json({
                ok: false,
                message: "SECRET_JWT_KEY no está configurado."
            });
    }

    try {
        const data = jwt.verify(token, SECRET_JWT_KEY);
        req.user = data;
        next();
    } catch (err) {
        return res
            .status(401)
            .json({
                ok: false,
                message: "Token inválido."
            });
    }
};

module.exports = verifyToken;
