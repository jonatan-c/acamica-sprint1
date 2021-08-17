const { Router } = require("express");
const router = Router();

const validar_login = require("../middlewares/users/islogin");
const validar_ID = require("../middlewares/pedidos/midPedidos");
const {
  agregarMedioDePagoAPedido,
} = require("../controllers/mediosDePago.controller");

router.post(
  "/users/:idUser/pedidos/:idPedido/medioDePago/:idMedioDePago",
  //   validar_login,
  validar_ID,
  agregarMedioDePagoAPedido
); // [M]

module.exports = router;
