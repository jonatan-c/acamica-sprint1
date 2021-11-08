const { Router } = require("express");
const router = Router();
const { auth } = require("../middlewares/users/auth.middlewares");
const {
  autenticarUsuario,
  usuarioAutenticado,
} = require("../controllers/auth.controller");

//
///****************************[B]

/**
 * @swagger
 * /auth:
 *  post:
 *    tags:
 *      - Login - Auth
 *    summary: Permite iniciar sesion
 *    description: inicia sesion en la aplicacion
 *    parameters:
 *    - name: email
 *      value : correo@correo.com
 *      description:  del usuario
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password1
 *      value : correo
 *      description: email del usuario
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */

router.post("/auth", autenticarUsuario);

router.get("/auth", auth, usuarioAutenticado);
module.exports = router;
