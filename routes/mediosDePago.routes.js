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
 * /restaurant/users/{idUserAdmin}/mediosDePago:
 *  get:
 *    tags:
 *      - Medios de pago Admin
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
 * /restaurant/users/{idUserAdmin}/mediosDePago:
 *  post:
 *    tags:
 *      - Medios de pago Admin
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
 * /restaurant/users/{idUserAdmin}/mediosDePago/{idMedioDePago}:
 *  put:
 *    tags:
 *      - Medios de pago Admin
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
 *      description: Nueva cantidad del pedido
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
 * /restaurant/users/{idUserAdmin}/mediosDePago/{idMedioDePago}:
 *  delete:
 *    tags:
 *      - Medios de pago Admin
 *    description: elimina un medio de pago si es admin
 *    parameters:
 *    - name: idUserAdmin
 *      description: Id del vehiculo
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

//************************************* [M]
// ********************************* [R]
// ********************************* M y R se agregaron a pedidosDB

module.exports = router;
