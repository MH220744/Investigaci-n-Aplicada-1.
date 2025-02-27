const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = []; // Para simular la base de datos

exports.register = async (req, res) => {
    const { username, password } = req.body;
    // Hash de la contraseña para mayor seguridad
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ message: "Usuario registrado" });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    //devolvera error 401 si el usuario no existe
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    //generación del token
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
};
