const { Router } = require("express");
const router = Router();

const {
  adminIdExist,
  isAdminRole,
  isAdminOnline,
} = require("../middlewares/users/usersAdmin.middlewares");

const {
  getProducts,
  addProduct,
  getProductbyId,
  deleteProductbyId,
  editProduct,
} = require("../controllers/products.controller");
/**
 * @swagger
 * /products:
 *  get:
 *    tags:
 *      - Productos
 *    summary: Lista de todos los productos, para cualquier persona
 *    description: Lista de todos los productos para personas sin cuenta creada
 *    responses:
 *      200:
 *        description: Success
 */

router.get("/products", getProducts);
//******************************************** [F]
/**
 * @swagger
 * /users/{idAdminUser}/productsAdmin:
 *  post:
 *    tags:
 *      - Productos
 *    summary: El admin puede agregar productos a la base de datos de productos
 *    description: Permite al admin agregar nuevos productos
 *    parameters:
 *    - name: idAdminUser
 *      description: Id del usuario
 *      in: path
 *      required: true
 *      type: integer
 *    - name: name_product
 *      description: nombre del nuevo producto a agregar
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price_product
 *      description: precio del nuevo producto
 *      in: formData
 *      required: true
 *      type: number
 *    - name: quantity_product
 *      description: precio del nuevo producto
 *      in: formData
 *      required: false
 *      type: number
 *    responses:
 *      200:
 *        description: Success
 */

router.post(
  "/users/:idAdminUser/productsAdmin",
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  addProduct
); // [F]
//******************************************** [G]

/**
 * @swagger
 * /users/{idAdminUser}/products/{idProduct}:
 *  put:
 *    tags:
 *      - Productos
 *    summary: El admin puede editar productos de la base de datos de productos por id
 *    description: Permite al admin editar un producto por id
 *    parameters:
 *    - name: idAdminUser
 *      description: Id del userAdmin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idProduct
 *      description: idProduct del producto, para comprobar que exista
 *      in: path
 *      required: true
 *      type: integer
 *    - name: name_product
 *      description: Nuevo nombre del producto
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price_product
 *      description: Nuevo precio del producto
 *      in: formData
 *      required: true
 *      type: integer
 *    - name: quantity_product
 *      description: precio del nuevo producto
 *      in: formData
 *      required: false
 *      type: number
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  "/users/:idAdminUser/products/:idProduct",
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  editProduct
); //  [G]

//******************************************** [H]
/**
 * @swagger
 * /users/{idAdminUser}/products/{idProduct}:
 *  delete:
 *    tags:
 *      - Productos
 *    summary: El admin puede eliminar productos de la base de datos de productos por id
 *    description: Permite eliminar un producto
 *    parameters:
 *    - name: idAdminUser
 *      description: Id del userAdmin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idProduct
 *      description: Id del Producto
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.delete(
  "/users/:idAdminUser/products/:idProduct",
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  deleteProductbyId
); //[H];

module.exports = router;
