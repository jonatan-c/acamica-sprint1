const { Router } = require("express");
const router = Router();
// ******************* Import Middlewares ******************
const {
  adminIdExist,
  isAdminRole,
  isAdminOnline,
} = require("../middlewares/users/usersAdmin.middlewares");

const { auth, isAdmin } = require("../middlewares/users/auth.middlewares");
// **************
const {
  isIdinDB,
  isPaymentMethodInDB,
} = require("../middlewares/paymentMethods/paymentMethods.middlewares");

// ******************* Import Controllers ******************

const {
  addPaymentMethod,
  editPaymentMethod,
  deletePaymentMethod,
  getIdPaymentMethods,
} = require("../controllers/paymentMethods.controller");

//************************************* [Q]

/**
 * @swagger
 * /users/{idAdminUser}/paymentMethods:
 *  get:
 *    tags:
 *      - Payment Methods Admin
 *    summary: The Admin can see every payment methods in the database.
 *    description: Admin can see every
 *    parameters:
 *    - name : x-auth-token
 *      value :
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: Id user Admin
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

router.get(
  "/users/:idAdminUser/paymentMethods",
  auth,
  isAdmin,
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  getIdPaymentMethods
);

//************************************* [N]
/**
 * @swagger
 * /users/{idAdminUser}/paymentMethods:
 *  post:
 *    tags:
 *      - Payment Methods Admin
 *    summary: The admin can add news payments methods.
 *    description: The admin can add news payments methods
 *    parameters:
 *    - name : x-auth-token
 *      value :
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: Id Admin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: name
 *      description: name of the new payment method
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.post(
  "/users/:idAdminUser/paymentMethods",
  auth,
  isAdmin,
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  isPaymentMethodInDB,
  addPaymentMethod
); // [N]

//************************************* [O]
/**
 * @swagger
 * /users/{idAdminUser}/paymentMethods/{idPaymentMethod}:
 *  put:
 *    tags:
 *      - Payment Methods Admin
 *    summary: The admin can modify the payment method by id.
 *    description: Edita un medio de pago
 *    parameters:
 *    - name : x-auth-token
 *      value :
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: id admin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idPaymentMethod
 *      description: id payment method for edit
 *      in: path
 *      required: true
 *      type: integer
 *    - name: name
 *      description: new name for payment method
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
router.put(
  "/users/:idAdminUser/paymentMethods/:idPaymentMethod",
  auth,
  isAdmin,
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  isIdinDB,
  editPaymentMethod
); // [N]

//************************************* [P]
/**
 * @swagger
 * /users/{idAdminUser}/paymentMethods/{idPaymentMethod}:
 *  delete:
 *    tags:
 *      - Payment Methods Admin
 *    summary: Admin can delete a payment method
 *    description: if user is admin, can delete a payment method
 *    parameters:
 *    - name : x-auth-token
 *      value :
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: idAdminUser
 *      description: Id admin
 *      in: path
 *      required: true
 *      type: integer
 *    - name: idPaymentMethod
 *      description: Id payment method to delete
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
router.delete(
  "/users/:idAdminUser/paymentMethods/:idPaymentMethod",
  auth,
  isAdmin,
  adminIdExist,
  isAdminRole,
  isAdminOnline,
  isIdinDB,
  deletePaymentMethod
); // [N]

module.exports = router;
