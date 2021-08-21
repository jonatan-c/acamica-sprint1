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
 *    description: lista todos los productos
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
 *    description: actualiza un producto si es admin
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
 *    description: elimina un prducto si es admin
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
