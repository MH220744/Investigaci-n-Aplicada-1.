const express = require("express"); // Usamos Express para manejar las rutas.
const { register, login } = require("../controllers/authController");

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
module.exports = router; // Permite que el router pueda ser usado en otros archivos
