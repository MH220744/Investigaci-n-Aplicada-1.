const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba GET
app.get("/", (req, res) => {
    res.json({ message: "API funcionando correctamente" });
});

// Ruta para el registro de usuarios
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Faltan campos requeridos (username, password)" });
    }

    // Lógica de simulación para el registro
    res.status(200).json({ message: "Usuario registrado exitosamente", user: { username } });
});

// Ruta del login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Verificación de que los datos ingresados son correctos
    if (username === "admin" && password === "1234") {
        // Generación del token JWT
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login exitoso", token });
    } else {
        // Mensaje de error si las credenciales no coinciden
        res.status(401).json({ message: "Credenciales incorrectas" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
