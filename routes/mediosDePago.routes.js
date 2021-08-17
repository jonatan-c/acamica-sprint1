const { Router } = require("express");
const router = Router();

const midValidarExistenciaDeUsuarioAdmin = require("../middlewares/pedidos/midValidarExistenciaDeUsuarioAdmin");
const midValidarEstadoAdmin = require("../middlewares/pedidos/midValidarEstadoAdmin");
const midValidarRolAdmin = require("../middlewares/pedidos/midValidarRolAdmin");

const midValidarMP = require("../middlewares/metodoDePago/midValidarMP");
const midValidarMPporID = require("../middlewares/metodoDePago/midValidarMPporID");

const {
  agregarMedioDePago,
  editarMedioDePago,
} = require("../controllers/mediosDePago.controller");

//************************************* [N]
router.post(
  "/users/:idUserAdmin/mediosDePago",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  midValidarMP,
  agregarMedioDePago
); // [N]

//************************************* [O]
router.put(
  "/users/:idUserAdmin/mediosDePago/:idMedioDePago",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  midValidarMP,
  midValidarMPporID,
  editarMedioDePago
); // [N]

module.exports = router;
