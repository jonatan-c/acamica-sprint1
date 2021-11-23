const { Router } = require("express");
const router = Router();

const {
  adminIdExist,
  isAdminRole,
  isAdminOnline,
} = require("../middlewares/users/usersAdmin.middlewares");

const { auth, isAdmin } = require("../middlewares/users/auth.middlewares");

const {
  isOrderPending,
  isOrderInDB,
  isOrderInDBparams,
} = require("../middlewares/pedidos/orders.middleware");
const { isUserOnline } = require("../middlewares/users/users.middlewares");

const {
  isIdinDBPM,
} = require("../middlewares/paymentMethods/paymentMethods.middlewares");

const {
  isIdOrderStatusinDB,
} = require("../middlewares/orderStatus/orderStatus.middlewares");

const {
  isIdAddressinDB,
} = require("../middlewares/address/address.middlewares");

const {
  hasProductsDB,
} = require("../middlewares/products/products.middlewares");

const {
  getProducts,
  obtenerPedidosIdUser,
  obtenerPedidosIdUserAdmin,
  editarPedidosIdUserAdmin,
  editarPedidosIdUser,
  realizarPedido,
  eliminarPedidosIdUser,
  createOrder,
  associateProducts,
  getOrderByIdUser,
  editOrderIdByUser,
} = require("../controllers/orders.controller");

///********************************* [C_P1] ////////////////
/**
 * @swagger
 * /users/{idUser}/products:
 *  get:
 *    tags:
 *      - Orders USER
 *    summary: List of products
 *    description: List of products if the user is online
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idUser
 *      description: idUser
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.get(
  "/users/:idUser/products",
  auth,
  hasProductsDB,
  isUserOnline,
  getProducts
);
///********************************* [C_P2] ////////////////
/**
 * @swagger
 * /users/{idUser}/order:
 *  post:
 *    tags:
 *      - Orders USER
 *    summary: Create order
 *    description: Create order if the user is online
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idUser
 *      description: idUser
 *      in: path
 *      required: true
 *      type: integer
 *    - name: id_address
 *      description: id_address
 *      in: formData
 *      required: false
 *      type: integer
 *    - name: id_payment_method
 *      description: id_payment_method
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: id_order_status
 *      description: id_order_status
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.post(
  "/users/:idUser/order",
  auth,
  isUserOnline,
  isIdinDBPM,
  isIdAddressinDB,
  isIdOrderStatusinDB,
  createOrder
);

/**
 * @swagger
 * /users/{idUser}/order/addproducts:
 *  post:
 *    tags:
 *      - Orders USER
 *    summary: Add products to order
 *    description: Add products to order if the user is online
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idUser
 *      description: idUser
 *      in: path
 *      required: true
 *      type: integer
 *    - name: id_order
 *      description: id_order
 *      in: formData
 *      required: false
 *      type: integer
 *    - name: id_product
 *      description: id_product
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: quantity_product
 *      description: quantity_product
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.post(
  "/users/:idUser/order/addproducts",
  auth,
  isOrderInDB,
  hasProductsDB,
  associateProducts
);

//********************************** [D]********************************************
/**
 * @swagger
 * /users/{idUser}/orders:
 *  get:
 *    tags:
 *      - Orders USER
 *    summary: List of orders by user
 *    description: List of orders by user if the user is online
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idUser
 *      description: idUser
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.get("/users/:idUser/orders", auth, getOrderByIdUser); // [D]

////////////////////////////////////// [S y T] ***************************************
/**
 * @swagger
 * /users/{idUser}/orders/{idOrder}/product/{idProduct}:
 *  put:
 *    tags:
 *      - Orders USER
 *    summary: Edit order by user , quantity_product if the user is online and order is pending
 *    description: Edit order by user , quantity_product if the user is online and order is pending
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idUser
 *      description: idUser
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idOrder
 *      description: idOrder
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idProduct
 *      description: idProduct
 *      in: path
 *      required: true
 *      type: integer
 *    - name: quantity_product
 *      description: quantity_product
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  "/users/:idUser/orders/:idOrder/product/:idProduct",
  auth,
  isOrderInDBparams,
  isOrderPending,

  editOrderIdByUser
); // [S]

/**
 * @swagger
 * /users/{idUser}/orders/{idOrder}/product/{idProduct}:
 *  delete:
 *    tags:
 *      - Orders USER
 *    summary: Delete order by user , quantity_product if the user is online and order is pending
 *    description: Delete order by user , quantity_product if the user is online and order is pending
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idUser
 *      description: idUser
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idOrder
 *      description: idOrder
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idProduct
 *      description: idProduct
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.delete(
  "/users/:idUser/order/:idOrder/product/:idProduct",
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
