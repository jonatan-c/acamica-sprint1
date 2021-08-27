const { Router } = require("express");
const router = Router();

const midValidarExistenciaDeUsuarioAdmin = require("../middlewares/pedidos/midValidarExistenciaDeUsuarioAdmin");
const midValidarEstadoAdmin = require("../middlewares/pedidos/midValidarEstadoAdmin");
const midValidarRolAdmin = require("../middlewares/pedidos/midValidarRolAdmin");

const midValidarMP = require("../middlewares/metodoDePago/midValidarMP");
const midValidarMPporID = require("../middlewares/metodoDePago/midValidarMPporID");

const {
  agregarMedioDePago,
  editarMedioDePago,
  eliminarMedioDePago,
  obtenerMediosDePago,
} = require("../controllers/mediosDePago.controller");

//************************************* [Q]
/**
 * @swagger
 * /users/{idUserAdmin}/mediosDePago:
 *  get:
 *    tags:
 *      - Medios de pago Admin
 *    summary: Permite al admin ver TODOS los medios de pago registrados en la base de datos
 *    description: Permite al admin ver todos los medios de pago
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
  "/users/:idUserAdmin/mediosDePago",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  obtenerMediosDePago
);

//************************************* [N]
/**
 * @swagger
 * /users/{idUserAdmin}/mediosDePago:
 *  post:
 *    tags:
 *      - Medios de pago Admin
 *    summary: Permite al admin agregar nuevos metodos de pagos, solo requiere el nombre.
 *    description: Permite al admin agregar un medio de pago
 *    parameters:
 *    - name: idUserAdmin
 *      description: Id del Admin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: nombre
 *      description: nombre del nuevo metodo de pago
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post(
  "/users/:idUserAdmin/mediosDePago",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  midValidarMP,
  agregarMedioDePago
); // [N]

//************************************* [O]
/**
 * @swagger
 * /users/{idUserAdmin}/mediosDePago/{idMedioDePago}:
 *  put:
 *    tags:
 *      - Medios de pago Admin
 *    summary: Permite al admin modificar un medio de pago por el id
 *    description: Edita un medio de pago
 *    parameters:
 *    - name: idUserAdmin
 *      description: id del usuario admin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idMedioDePago
 *      description: id del medio de pago a editar
 *      in: path
 *      required: true
 *      type: integer
 *    - name: nombre
 *      description: nuevo nombre del pedido
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put(
  "/users/:idUserAdmin/mediosDePago/:idMedioDePago",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  midValidarMP,
  midValidarMPporID,
  editarMedioDePago
); // [N]

//************************************* [P]
/**
 * @swagger
 * /users/{idUserAdmin}/mediosDePago/{idMedioDePago}:
 *  delete:
 *    tags:
 *      - Medios de pago Admin
 *    summary: Permite al admin eliminar un medio de pago por id
 *    description: elimina un medio de pago si es admin
 *    parameters:
 *    - name: idUserAdmin
 *      description: Id del user Admin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idMedioDePago
 *      description: Id del medio de pago a eliminar
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.delete(
  "/users/:idUserAdmin/mediosDePago/:idMedioDePago",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  midValidarMP,
  midValidarMPporID,
  eliminarMedioDePago
); // [N]

module.exports = router;
