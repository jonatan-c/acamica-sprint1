const { Router } = require("express");
const router = Router();
const midValidarEmail = require("../middlewares/users/midValidarEmail");
const midValidarLogin = require("../middlewares/users/midValidarLogin");

const {
  crearUsuario,
  iniciarSesion,
  eliminarUsuario,
  actualizarUsuario,
} = require("../controllers/users.controller");

//********************** [A] y [L]
router.post("/users/crear-cuenta", midValidarEmail, crearUsuario); // [A] y [L]
///****************************[B]
router.post("/users/login", midValidarLogin, iniciarSesion); // [B]
//******************** SIN USO ACTUALMENTE
// router.delete("/:idUser", eliminarUsuario);
// router.put("/:idUser", actualizarUsuario);

module.exports = router;
