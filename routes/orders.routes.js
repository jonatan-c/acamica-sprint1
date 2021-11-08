const { Router } = require("express");
const router = Router();

const {
  adminIdExist,
  isAdminRole,
  isAdminOnline,
} = require("../middlewares/users/usersAdmin.middlewares");

const { auth, isAdmin } = require("../middlewares/users/auth.middlewares");

const { isOrderPending } = require("../middlewares/pedidos/orders.middleware");

const {
  obtenerProductos,
  obtenerPedidosIdUser,
  obtenerPedidosIdUserAdmin,
  editarPedidosIdUserAdmin,
  editarPedidosIdUser,
  realizarPedido,
  eliminarPedidosIdUser,
} = require("../controllers/orders.controller");

///********************************* [C_P1] ////////////////
/**
 * @swagger
 * /users/{idUser}/productos:
 *  get:
 *    tags:
 *      - Pedidos USER
 *    summary: Lista de productos para agregar a pedidos, requiere iniciar sesion
 *    description: Permite al usuario  registrado y logeado ver TODOS LOS productos
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
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
  auth,
  isAdmin,
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  obtenerProductos
);
///********************************* [C_P2] ////////////////
/**
 * @swagger
 * /users/{idUser}/productos:
 *  post:
 *    tags:
 *      - Pedidos USER
 *    summary: Lista de productos para enviar como pedidos, requiere iniciar sesion
 *    description: Permite al usuario registrado y logeado agregar productos a su pedido
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
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
 *      required: false
 *      type: number
 *    - name: direccion
 *      description: direccion para enviar el pedido
 *      in: formData
 *      required: false
 *      type: string
 *    - name: id_payment_method
 *      description: Id del medio de pago, para buscar en base de datos
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: id_order_status
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
  auth,
  // midValidarExistenciaDeUsuario,
  // midValidarEstadoOnLine,
  // midValidarRolUser,
  // midValidarExistenciaIDPedido,
  realizarPedido

  // 1ero hace rque por formData me envie el idPedido, si esta en base de datos, esta agregando mas, en caso contrario esta aumentando
);

//********************************** [D]********************************************
/**
 * @swagger
 * /users/{idUser}/pedidos:
 *  get:
 *    tags:
 *      - Pedidos USER
 *    summary: Lista de pedidos de un usuario
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
  // midValidarExistenciaDeUsuario,
  // midValidarEstadoOnLine,
  obtenerPedidosIdUser
); // [D]

////////////////////////////////////// [S y T] ***************************************
/**
 * @swagger
 * /users/{idUser}/pedidos/{idPedido}:
 *  put:
 *    tags:
 *      - Pedidos USER
 *    summary: Editar pedido por id, permite cambiar la cantidad
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
  // midValidarExistenciaDeUsuario,
  // midValidarEstadoOnLine,
  // midValidarExistenciadeIDPEDIDO,
  // midValidarEstadoPedido,
  // midValidarPedidoExista,
  editarPedidosIdUser
); // [S]

///// elminar producto por id usuario

/**
 * @swagger
 * /users/{idUser}/pedidos/{idPedido}:
 *  delete:
 *    tags:
 *      - Pedidos USER
 *    summary: Elimnar producto de pedido
 *    description: Eliminar producto de pedido
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
 *      description: idProducto del pedido para eliminar, si se encuentra "Pendiente"
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.delete(
  "/users/:idUser/pedidos/:idPedido",
  // midValidarExistenciaDeUsuario,
  // midValidarEstadoOnLine,
  // midValidarExistenciadeIDPEDIDO,
  // midValidarEstadoPedido,
  // midValidarPedidoExista,
  eliminarPedidosIdUser
); // [S]

////////////////////////////////////// [E_1] ***************************************
// ---------------------------------- [ADMIN]

/**
 * @swagger
 * /users/{idAdminUser}/pedidosAdmin:
 *  get:
 *    tags:
 *      - Pedidos Admin
 *    summary: Permite al admin ver TODOS los pedidos
 *    description: Permite al admin agregar nuevos productos
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: Id del usuario Admin para ver todos los pedidos
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.get(
  "/users/:idAdminUser/pedidosAdmin",
  auth,
  isAdmin,
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  obtenerPedidosIdUserAdmin
); // [E_1]
////////////////////////////////////// [E_2] ***************************************
/**
 * @swagger
 * /users/{idAdminUser}/pedidosAdmin/{idPedido}:
 *  put:
 *    tags:
 *      - Pedidos Admin
 *    summary: Permite ver UN pedido por el id
 *    description: actualiza un producto si es admin
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: Id del userAdmin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idPedido
 *      description: idPedido del pedido para editar, si se encuentra "Pendiente"
 *      in: path
 *      required: true
 *      type: integer
 *    - name: id_order_status
 *      description: Nuevo estado del pedido
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.put(
  "/users/:idAdminUser/pedidosAdmin/:idPedido",
  auth,
  isAdmin,
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  isOrderPending,
  editarPedidosIdUserAdmin
); // [E_2]

module.exports = router;
