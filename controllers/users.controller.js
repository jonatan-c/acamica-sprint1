require("dotenv").config();
const Sequelize = require("sequelize");
const connection = require("../config/db.config");
const usersDB = require("../models/Users")(connection, Sequelize);

const usersCtrl = {};
///*********************************** [A] y [L]
usersCtrl.crearUsuario = async (req, res, next) => {
  const newUser = await usersDB.build({
    // rol: req.body.rol,
    nombre: req.body.nombre,
    email: req.body.email,
    password1: req.body.password1,
    // estado: req.body.estado,
  });
  const result = await newUser.save();
  // console.log(result);

  res.json({ mensaje: "Usuario creado correctamente" });
};
//************************************ [B]
// usersCtrl.iniciarSesion = (req, res, next) => {
//   res.json({ mensaje: `Hola ${req.body.nombre} , gracias por logear!!!` });
// };
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

module.exports = usersCtrl;
