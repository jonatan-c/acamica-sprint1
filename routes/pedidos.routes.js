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
 *      - Pedidos USER
 *    description: Permite al usuario  registrado y logeado ver TODOS LOS productos
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
 *      - Pedidos USER
 *    description: Permite al usuario registrado y logeado agregar productos a su pedido
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
 *    - name: direccion
 *      description: direccion para enviar el pedido
 *      in: formData
 *      required: true
 *      type: string
 *    - name: idMedioDePago
 *      description: Id del medio de pago, para buscar en base de datos
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.post(
  "/users/:idUser/productos",
  midValidarExistenciaDeUsuario,
  midValidarEstadoOnLine,
  midValidarRolUser,
  realizarPedido
);

//********************************** [D]********************************************
/**
 * @swagger
 * /restaurant/users/{idUser}/pedidos:
 *  get:
 *    tags:
 *      - Pedidos USER
 *    description: Permite al usuario ver todos sus pedidos, puede tener varios
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
  "/users/:idUser/pedidos",
  midValidarExistenciaDeUsuario,
  midValidarEstadoOnLine,
  obtenerPedidosIdUser
); // [D]

////////////////////////////////////// [S y T] ***************************************
/**
 * @swagger
 * /restaurant/users/{idUser}/pedidos/{idPedido}:
 *  put:
 *    tags:
 *      - Pedidos USER
 *    description: Edita un producto del pedido de un usuario logeado.
 *    parameters:
 *    - name: idUser
 *      description: Id del user
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idPedido
 *      description: idPedido del pedido para editar, si se encuentra "Pendiente"
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idProducto
 *      description: idProducto del pedido para editar, si se encuentra "Pendiente"
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: cantidad
 *      description: Nueva cantidad del pedido
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  "/users/:idUser/pedidos/:idPedido",
  midValidarExistenciaDeUsuario,
  midValidarEstadoOnLine,
  midValidarEcistenciadeIDPEDIDO,
  midValidarEstadoPedido,
  midValidarPedidoExista,
  editarPedidosIdUser
); // [S]
module.exports = router;

////////////////////////////////////// [E_1] ***************************************

/**
 * @swagger
 * /restaurant/users/{idUserAdmin}/pedidosAdmin:
 *  get:
 *    tags:
 *      - Pedidos Admin
 *    description: Permite al admin agregar nuevos productos
 *    parameters:
 *    - name: idUserAdmin
 *      description: Id del usuario Admin para ver todos los pedidos
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.get(
  "/users/:idUserAdmin/pedidosAdmin",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  obtenerPedidosIdUserAdmin
); // [E_1]
////////////////////////////////////// [E_2] ***************************************
/**
 * @swagger
 * /restaurant/users/{idUserAdmin}/pedidosAdmin/{idPedido}:
 *  put:
 *    tags:
 *      - Pedidos Admin
 *    description: actualiza un producto si es admin
 *    parameters:
 *    - name: idUserAdmin
 *      description: Id del userAdmin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idPedido
 *      description: idPedido del pedido para editar, si se encuentra "Pendiente"
 *      in: path
 *      required: true
 *      type: integer
 *    - name: estado
 *      description: Nuevo estado del pedido
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put(
  "/users/:idUserAdmin/pedidosAdmin/:idPedido",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  midValidarEstadoDePedidoPosibles,
  editarPedidosIdUserAdmin
); // [E_2]
