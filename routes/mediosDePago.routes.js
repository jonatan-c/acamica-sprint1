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
  eliminarMedioDePago,
  obtenerMediosDePago,
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

//************************************* [P]
router.delete(
  "/users/:idUserAdmin/mediosDePago/:idMedioDePago",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  midValidarMP,
  midValidarMPporID,
  eliminarMedioDePago
); // [N]

//************************************* [Q]
router.get(
  "/users/:idUserAdmin/mediosDePago",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  obtenerMediosDePago
);

//************************************* [M]
//validar que existe idUser, que esta online y que es usuario
//valudar que existe idPedido, y que esta en modo Pendiente
// mostrar MP base de datos
// hacer post con id del metodo de pago y colocar en pedidoDB
router.post(
  "/users/:idUser/pedido/:idPedido/mediosDePago"
  // agregarmediodePagoAlPedido
);

// ********************************* [R]
//validar que existe idUser, que esta online y que es usuario
//valudar que existe idPedido, y que esta en modo Pendiente
// mostrar MP base de datos
// hacer post con id del metodo de pago y colocar en pedidoDB
router.post(
  "/users/:idUser/pedido/:idPedido/direccion"
  // agregarmediodePagoAlPedido
);

module.exports = router;
