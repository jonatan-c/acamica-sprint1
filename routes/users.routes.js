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
 * /users/crear-cuenta:
 *  post:
 *    tags:
 *      - Crear cuenta y logear
 *    summary: Permite crear cuenta
 *    description: crea un usuario
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

router.post("/users/crear-cuenta", midValidarEmail, crearUsuario); // [A] y [L]
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

router.post("/users/login", midValidarLogin, iniciarSesion); // [B]

module.exports = router;
