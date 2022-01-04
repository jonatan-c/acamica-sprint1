const { Router } = require("express");
const router = Router();

const {
  adminIdExist,
  isAdminRole,
  isAdminOnline,
} = require("../middlewares/users/usersAdmin.middlewares");

const {
  auth,
  isAdmin,
  isAuthIdUserParams,
} = require("../middlewares/users/auth.middlewares");

const {
  isOrderPending,
  isOrderInDB,
  isOrderInDBparams,
  isOrderProductInDBparams,
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
  isAuthIdUserParams,
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
  isAuthIdUserParams,
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
router.get("/users/:idUser/orders", auth, isAuthIdUserParams, getOrderByIdUser); // [D]

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
  isAuthIdUserParams,
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
  "/users/:idUser/orders/:idOrder/product/:idProduct",
  auth,
  isAuthIdUserParams,
  isOrderInDBparams,
  isOrderPending,
  isOrderProductInDBparams,

  eliminarPedidosIdUser
); // [S]

////////////////////////////////////// [E_1] ***************************************
// ---------------------------------- [ADMIN]

/**
 * @swagger
 * /users/{idAdminUser}/ordersAdmin:
 *  get:
 *    tags:
 *      - Order Admin
 *    summary: The admin can see every the orders
 *    description: The admin can see every the orders
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: idAdminUser
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.get(
  "/users/:idAdminUser/ordersAdmin",
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
 * /users/{idAdminUser}/ordersAdmin/{idOrder}:
 *  put:
 *    tags:
 *      - Order Admin
 *    summary: The admin can edit the order if order status is pending
 *    description: The admin can edit the order if order status is pending
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: idAdminUser
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idOrder
 *      description: idOrder
 *      in: path
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
router.put(
  "/users/:idAdminUser/ordersAdmin/:idOrder",
  auth,
  isAdmin,
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  isOrderPending,
  isIdOrderStatusinDB,
  editarPedidosIdUserAdmin
);

module.exports = router;
