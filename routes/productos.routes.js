const { Router } = require("express");
const router = Router();

const midValidarExistenciaDeUsuarioAdmin = require("../middlewares/pedidos/midValidarExistenciaDeUsuarioAdmin");
const midValidarEstadoAdmin = require("../middlewares/pedidos/midValidarEstadoAdmin");
const midValidarRolAdmin = require("../middlewares/pedidos/midValidarRolAdmin");

const {
  obtenerProductos,
  agregarProducto,
  obtenerProducto,
  eliminarProducto,
  actualizarProducto,
} = require("../controllers/productos.controller");
/**
 * @swagger
 * /restaurant/productos:
 *  get:
 *    tags:
 *      - Productos
 *    summary: Lista de todos los productos, para cualquier persona
 *    description: Lista de todos los productos para personas sin cuenta creada
 *    responses:
 *      200:
 *        description: Success
 */

router.get("/productos", obtenerProductos);
//******************************************** [F]
/**
 * @swagger
 * /restaurant/users/{idUserAdmin}/productosAdmin:
 *  post:
 *    tags:
 *      - Productos
 *    summary: El admin puede agregar productos a la base de datos de productos
 *    description: Permite al admin agregar nuevos productos
 *    parameters:
 *    - name: idUserAdmin
 *      description: Id del usuario
 *      in: path
 *      required: true
 *      type: integer
 *    - name: nombre
 *      description: nombre del nuevo producto a agregar
 *      in: formData
 *      required: true
 *      type: string
 *    - name: precio
 *      description: precio del nuevo producto
 *      in: formData
 *      required: true
 *      type: number
 *    responses:
 *      200:
 *        description: Success
 */

router.post(
  "/users/:idUserAdmin/productosAdmin",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  agregarProducto
); // [F]
//******************************************** [G]

/**
 * @swagger
 * /restaurant/users/{idUserAdmin}/productos/{idProducto}:
 *  put:
 *    tags:
 *      - Productos
 *    summary: El admin puede editar productos de la base de datos de productos por id
 *    description: Permite al admin editar un producto por id
 *    parameters:
 *    - name: idUserAdmin
 *      description: Id del userAdmin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idProducto
 *      description: idProducto del producto, para comprobar que exista
 *      in: path
 *      required: true
 *      type: integer
 *    - name: nombre
 *      description: Nuevo nombre del producto
 *      in: formData
 *      required: true
 *      type: string
 *    - name: precio
 *      description: Nuevo precio del producto
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  "/users/:idUserAdmin/productos/:idProducto",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  actualizarProducto
); // solo por admin [G]

//******************************************** [H]
/**
 * @swagger
 * /restaurant/users/{idUserAdmin}/productos/{idProducto}:
 *  delete:
 *    tags:
 *      - Productos
 *    summary: El admin puede eliminar productos de la base de datos de productos por id
 *    description: Permite eliminar un producto
 *    parameters:
 *    - name: idUserAdmin
 *      description: Id del vehiculo
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idProducto
 *      description: Id del vehiculo
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.delete(
  "/users/:idUserAdmin/productos/:idProducto",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  eliminarProducto
); //[H];

module.exports = router;
