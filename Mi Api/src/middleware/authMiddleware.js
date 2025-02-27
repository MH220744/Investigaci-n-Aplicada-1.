const jwt = require("jsonwebtoken"); // libreria para el manejo de tokens JWT.

module.exports = (req, res, next) => {
    // token para el encabezado de la solicitud
    const token = req.headers["authorization"];

    if (!token) return res.status(403).json({ error: "Acceso denegado" });
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token inválido" });
        req.user = decoded;
        next();
    });
};
