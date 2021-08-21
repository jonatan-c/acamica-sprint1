const { Router } = require("express");
const router = Router();

const midValidarExistenciaDeUsuario = require("../middlewares/users/midValidarExistenciaDeUsuario");
const midValidarEstadoOnLine = require("../middlewares/users/midValidarEstadoOnLine");
const midValidarExistenciaDeUsuarioAdmin = require("../middlewares/pedidos/midValidarExistenciaDeUsuarioAdmin");
const midValidarEstadoAdmin = require("../middlewares/pedidos/midValidarEstadoAdmin");
const midValidarRolAdmin = require("../middlewares/pedidos/midValidarRolAdmin");
const midValidarEstadoPedido = require("../middlewares/pedidos/midValidarEstadoPedido");
const midValidarEstadoDePedidoPosibles = require("../middlewares/pedidos/midValidarEstadoDePedidoPosibles");
const midValidarRolUser = require("../middlewares/pedidos/midValidarRolUser");
const midValidarPedidoExista = require("../middlewares/pedidos/midValidarPedidoExista");
const midValidarEcistenciadeIDPEDIDO = require("../middlewares/pedidos/midValidarEcistenciadeIDPEDIDO");

const {
  obtenerProductos,
  obtenerPedidosIdUser,
  obtenerPedidosIdUserAdmin,
  editarPedidosIdUserAdmin,
  editarPedidosIdUser,
  realizarPedido,
  editarCantidadPedido,
} = require("../controllers/pedidos.controller");
///********************************* [C_P1] ////////////////
/**
 * @swagger
 * /restaurant/users/{idUser}/productos:
 *  get:
 *    tags:
 *      - Pedidos
 *    description: Permite al admin agregar nuevos productos
 *    parameters:
 *    - name: idUser
 *      description: Id del usuario
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.get(
  "/users/:idUser/productos",
  midValidarExistenciaDeUsuario,
  midValidarEstadoOnLine,
  obtenerProductos
);
///********************************* [C_P2] ////////////////
/**
 * @swagger
 * /restaurant/users/{idUser}/productos:
 *  post:
 *    tags:
 *      - Pedidos
 *    description: Permite al usuario registrado y logeado ver los productos,nombre y precio
 *    parameters:
 *    - name: idUser
 *      description: Id del usuario
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idProducto
 *      description: idProducto del producto que quiere agregar al pedido
 *      in: formData
 *      required: false
 *      type: number
 *    - name: cantidad
 *      description: cantidad del producto requerido
 *      in: formData
 *      required: true
 *      type: number
 *    responses:
 *      200:
 *        description: Success
 */
router.post(
  "/users/:idUser/productos",
  midValidarEstadoOnLine,
  midValidarExistenciaDeUsuario,
  midValidarRolUser,
  realizarPedido
);

///********************* [Poder cambiar la cantidad de un producto seleccionado] ////////////////
// router.put(
//   "/users/:idUser/pedidos/:idPedido",
//   midValidarEstadoOnLine,
//   midValidarExistenciaDeUsuario,
//   midValidarRolUser,
//   editarCantidadPedido
// );
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
  midValidarEstadoDePedidoPosibles,
  editarPedidosIdUserAdmin
); // [E_2]

////////////////////////////////////// [S y T] ***************************************
router.put(
  "/users/:idUser/pedido/:idPedido/productos/:idProducto",
  midValidarExistenciaDeUsuario,
  midValidarEstadoOnLine,
  midValidarEcistenciadeIDPEDIDO,
  midValidarEstadoPedido,
  midValidarPedidoExista,
  editarPedidosIdUser
); // [S]
///productos/:idProducto
module.exports = router;
