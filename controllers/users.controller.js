require("dotenv").config();
const Sequelize = require("sequelize");
const connection = require("../config/db.config");
const usersDB = require("../models/Users")(connection, Sequelize);

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersCtrl = {};
///*********************************** [A] y [L]
usersCtrl.createUser = async (req, res, next) => {
  const newUser = await usersDB.build({
    name: req.body.name,
    email: req.body.email,
    password1: req.body.password1,
  });

  res.json({ mensaje: "User created successfully" });
};

// const Usuario = require("../models/Usuario");

// exports.crearUsuario = async (req, res) => {
//   //revisar si hay errores
//   const { email, password } = req.body;
//   try {
//     //crea el nuevo usuario
//     usuario = new Usuario(req.body);

//     //Hashear el password
//     const salt = await bcryptjs.genSalt(10);
//     usuario.password = await bcryptjs.hash(password, salt);

//     // guarda el usuario
//     await usuario.save();

//     // Crear y firmar el JWT
//     const payload = {
//       usuario: {
//         id: usuario.id,
//       },
//     };

//     // firmar el JWT
//     jwt.sign(
//       payload,
//       process.env.SECRETA,
//       {
//         expiresIn: 3600, //1hora
//       },
//       (error, token) => {
//         if (error) throw error;

//         //Mensaje de confirmacion
//         res.json({ token });
//       }
//       );
//     } catch (error) {
//       console.log(error);
//     res.status(400).send("Hubo un error");
//   }
// }
// //******************** SIN USO ACTUALMENTE

// usersCtrl.eliminarUsuario = (req, res, next) => {
//   const obtenerUsuarioID = req.params.idUser; // obtengo el id del cliente que busca un producto
//   const userIndex = usersDB.findIndex(
//     (prod) => prod.idUser === parseInt(obtenerUsuarioID)
//   ); //0 vs -1
//   if (userIndex === -1) {
//     res.status(404).json({ mensaje: "No encontrado" });
//   } else {
//     usersDB.splice(userIndex, 1);
//     res.json(usersDB);
//   }
// };
// //******************** SIN USO ACTUALMENTE

// usersCtrl.actualizarUsuario = (req, res, next) => {
//   const obtenerUsuarioID = req.params.idUser; // obtengo el id del cliente que busca un producto
//   let existeUsuario = usersDB.find(
//     (prod) => prod.idUser === parseInt(obtenerUsuarioID)
//   ); //undefined vs arreglo
//   if (!existeUsuario) {
//     return res.status(404).json({ mensaje: "Usuario no encontrado" });
//   } else {
//     existeUsuario.nombre = req.body.nombre;
//     existeUsuario.password = req.body.password;
//     existeUsuario.email = req.body.email;
//     res.json(existeUsuario);
//   }
// };
//************************************ [B]
// usersCtrl.iniciarSesion = (req, res, next) => {
//   res.json({ mensaje: `Hola ${req.body.nombre} , gracias por logear!!!` });
// };
module.exports = usersCtrl;
