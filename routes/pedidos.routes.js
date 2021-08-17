const { Router } = require("express");
const router = Router();

const midValidarExistenciaDeUsuario = require("../middlewares/users/midValidarExistenciaDeUsuario");
const midValidarEstadoOnLine = require("../middlewares/users/midValidarEstadoOnLine");
const validar_ID = require("../middlewares/pedidos/midPedidos");
const midValidarExistenciaDeUsuarioAdmin = require("../middlewares/pedidos/midValidarExistenciaDeUsuarioAdmin");
const midValidarEstadoAdmin = require("../middlewares/pedidos/midValidarEstadoAdmin");
const midValidarRolAdmin = require("../middlewares/pedidos/midValidarRolAdmin");

const {
  realizarPedido,
  obtenerPedidosIdUser,
  obtenerPedidosIdUserAdmin,
  editarPedidosIdUserAdmin,
} = require("../controllers/pedidos.controller");
///********************************* [C] //////////////// me genera dudas ; hacer luego
// router.post("/users/:idUser/pedidos", midValidarLogin, realizarPedido); // [C]
//********************************** [D]********************************************
router.get(
  "/users/:idUser/pedidos",
  midValidarExistenciaDeUsuario,
  midValidarEstadoOnLine,
  obtenerPedidosIdUser
); // [D]
////////////////////////////////////// [E_1] ***************************************
router.get(
  "/users/:idUserAdmin/pedidosAdmin",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  obtenerPedidosIdUserAdmin
); // [E_1]
////////////////////////////////////// [E_2] ***************************************
router.put(
  "/users/:idUserAdmin/pedidosAdmin/:idPedido",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  editarPedidosIdUserAdmin
); // [E_2]

module.exports = router;
