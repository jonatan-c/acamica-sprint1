const { Router } = require("express");
const router = Router();

const {
  auth,
  isAuthIdUserParams,
} = require("../middlewares/users/auth.middlewares");

const {
  getAddress,
  addAddress,
  editAddress,
  deleteAddress,
} = require("../controllers/address.controller");

/**
 * @swagger
 * /users/{idUser}/address:
 *  get:
 *    tags:
 *      - Address User
 *    summary: Get all address of user
 *    description: Get all address of user
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idUser
 *      description: id of user
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.get("/users/:idUser/address", auth, isAuthIdUserParams, getAddress);

/**
 * @swagger
 * /users/{idUser}/address:
 *  post:
 *    tags:
 *      - Address User
 *    summary: Add address of user
 *    description: Add address of user
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idUser
 *      description: id of user
 *      in: path
 *      required: true
 *      type: integer
 *    - name: name
 *      description: name of address
 *      in: formData
 *      required: true
 *      type: string
 *    - name: number
 *      description: number of address
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post("/users/:idUser/address", auth, isAuthIdUserParams, addAddress);

/**
 * @swagger
 * /users/{idUser}/address/{idAddress}:
 *  put:
 *    tags:
 *      - Address User
 *    summary: Edit address of user
 *    description: Edit address of user
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idUser
 *      description: id of user
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idAddress
 *      description: id of address
 *      in: path
 *      required: true
 *      type: integer
 *    - name: name
 *      description: name of address
 *      in: formData
 *      required: true
 *      type: string
 *    - name: number
 *      description: number of address
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.put(
  "/users/:idUser/address/:idAddress",
  auth,
  isAuthIdUserParams,
  editAddress
);

/**
 * @swagger
 * /users/{idUser}/address/{idAddress}:
 *  delete:
 *    tags:
 *      - Address User
 *    summary: Delete address of user
 *    description: Delete address of user
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idUser
 *      description: id of user
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idAddress
 *      description: id of address
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.delete(
  "/users/:idUser/address/:idAddress",
  auth,
  isAuthIdUserParams,
  deleteAddress
);

module.exports = router;
