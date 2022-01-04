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
  isAuthIdAdminUserParams,
} = require("../middlewares/users/auth.middlewares");

const {
  hasProductsDB,
  isIdProductInDb,
} = require("../middlewares/products/products.middlewares");

const { productsCache } = require("../middlewares/cache/productsCache");

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
 *      - Products Admin
 *    summary: list of products in the store for all users
 *    description: list of products in the store for all users
 *    responses:
 *      200:
 *        description: Success
 */

router.get("/products", productsCache, getProducts);
//******************************************** [F]
/**
 * @swagger
 * /users/{idAdminUser}/productsAdmin:
 *  post:
 *    tags:
 *      - Products Admin
 *    summary: add a new product to the store if the user is an admin
 *    description: add a new product to the store if the user is an admin
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: id of the admin user
 *      in: path
 *      required: true
 *      type: integer
 *    - name: name_product
 *      description: name of the product
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price_product
 *      description: price of the product
 *      in: formData
 *      required: true
 *      type: number
 *    responses:
 *      200:
 *        description: Success
 */

router.post(
  "/users/:idAdminUser/productsAdmin",
  auth,
  isAdmin,
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
 *      - Products Admin
 *    summary: edit a product if the user is an admin and the product exists
 *    description: edit a product if the user is an admin and the product exists
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: id of the admin user
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idProduct
 *      description: id of the product
 *      in: path
 *      required: true
 *      type: integer
 *    - name: name_product
 *      description: name of the product to edit
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price_product
 *      description: price of the product to edit
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  "/users/:idAdminUser/products/:idProduct",
  auth,
  isAdmin,
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  isIdProductInDb,
  hasProductsDB,
  editProduct
); //  [G]

//******************************************** [H]
/**
 * @swagger
 * /users/{idAdminUser}/products/{idProduct}:
 *  delete:
 *    tags:
 *      - Products Admin
 *    summary: delete a product if the user is an admin and the product exists
 *    description: delete a product if the user is an admin and the product exists
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: id of the admin user
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idProduct
 *      description: id of the product
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.delete(
  "/users/:idAdminUser/products/:idProduct",
  auth,
  isAdmin,
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  isAuthIdAdminUserParams,
  isIdProductInDb,
  hasProductsDB,
  deleteProductbyId
); //[H];

module.exports = router;
