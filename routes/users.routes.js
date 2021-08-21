const { Router } = require("express");
const router = Router();
const midValidarEmail = require("../middlewares/users/midValidarEmail");
const midValidarLogin = require("../middlewares/users/midValidarLogin");
const usersDB = require("../models/Users");

const {
  crearUsuario,
  iniciarSesion,
  eliminarUsuario,
  actualizarUsuario,
} = require("../controllers/users.controller");

//********************** [A] y [L]
/**
 * @swagger
 * /restaurant/users/crear-cuenta:
 *  post:
 *    tags:
 *      - Crear cuenta y logear
 *    description: crea un usuario
 *    parameters:
 *    - name: idUser
 *      description: Id del usuario
 *      in: formData
 *      required: false
 *      type: integer
 *    - name: nombre
 *      description: nombre del usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: password del usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: email del usuario
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */

router.post("/users/crear-cuenta", midValidarEmail, crearUsuario); // [A] y [L]
///****************************[B]
/**
 * @swagger
 * /restaurant/users/login:
 *  post:
 *    tags:
 *      - Crear cuenta y logear
 *    description: inicia sesion en la aplicacion
 *    parameters:
 *    - name: id
 *      description: Id del vehiculo
 *      in: formData
 *      required: false
 *      type: integer
 *    - name: nombre
 *      description: nombre del usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: password del usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: email del usuario
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */

router.post("/users/login", midValidarLogin, iniciarSesion); // [B]
//******************** SIN USO ACTUALMENTE
// router.delete("/:idUser", eliminarUsuario);
// router.put("/:idUser", actualizarUsuario);

module.exports = router;
