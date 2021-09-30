const { Router } = require("express");
const router = Router();

//*****************middlewares */

const { isEmailValid } = require("../middlewares/users/users.middlewares");
// const midValidarLogin = require("../middlewares/users/midValidarLogin");

const {
  createUser,
  iniciarSesion,
  eliminarUsuario,
  actualizarUsuario,
} = require("../controllers/users.controller");

//********************** [A] y [L]
/**
 * @swagger
 * /users/register:
 *  post:
 *    tags:
 *      - Crear cuenta y logear
 *    summary: Permite crear cuenta
 *    description: crea un usuario
 *    parameters:
 *    - name: name
 *      description: nombre del usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password1
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
//  midValidarEmail
router.post("/users/register", isEmailValid, createUser); // [A] y [L]
///****************************[B]
/**
 * @swagger
 * /users/login:
 *  post:
 *    tags:
 *      - Crear cuenta y logear
 *    summary: Permite iniciar sesion
 *    description: inicia sesion en la aplicacion
 *    parameters:
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

// router.post("/users/login", midValidarLogin, iniciarSesion); // [B]

module.exports = router;
