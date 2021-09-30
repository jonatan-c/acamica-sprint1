// rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");

//

router.post(authController.autenticarUsuario);
router.get("/", auth, authController.usuarioAutenticado);

module.exports = router;
