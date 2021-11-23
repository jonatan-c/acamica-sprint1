const { Router } = require("express");
const router = Router();

const {
  existIdUser,
  isUserSuspendido,
} = require("../middlewares/users/users.middlewares");

const {
  adminIdExist,
  isAdminRole,
  isAdminOnline,
} = require("../middlewares/users/usersAdmin.middlewares");

const { auth, isAdmin } = require("../middlewares/users/auth.middlewares");
const {
  autenticarUsuario,
  usuarioAutenticado,
  userDiscontinued,
} = require("../controllers/auth.controller");

//
///****************************[B]

/**
 * @swagger
 * /auth:
 *  post:
 *    tags:
 *      - Login - Auth
 *    summary: You can login a user
 *    description: You can login a user
 *    parameters:
 *    - name: email
 *      value : correo@correo.com
 *      description:  Email of the user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password1
 *      value : correo
 *      description: password of the user
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */

router.post("/auth", isUserSuspendido, autenticarUsuario);

///****************************El Admin puede suspender usuario

/**
 * @swagger
 * /users/{idAdminUser}/suspend:
 *  put:
 *    tags:
 *      - Suspencion - Auth
 *    summary: Admin puede cambiar estado de usuario por suspendido
 *    description:
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: Id user Admin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: estadoUser
 *      value : discontinued
 *      description:
 *      in: formData
 *      required: true
 *      type: string
 *    - name: id_user
 *      value : 10
 *      description:
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.put(
  "/users/:idAdminUser/suspend",
  auth,
  isAdmin,
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  existIdUser,
  userDiscontinued
);

router.get("/auth", auth, usuarioAutenticado);
module.exports = router;
