const usersDB = require("../models/Users");

const usersCtrl = {};
///**1111********* [A] y [L]
usersCtrl.crearUsuario = (req, res, next) => {
  const newUser = {};
  newUser.id = parseInt(3);
  newUser.rol = "user";
  newUser.nombre = req.body.nombre;
  newUser.password = req.body.password;
  newUser.email = req.body.email;
  newUser.estado = "off";
  usersDB.push(newUser);
  res.json({ mensaje: "Usuario creado correctamente" });
};
//****aaa**************** [B]
usersCtrl.iniciarSesion = (req, res, next) => {
  res.json({ mensaje: `Hola ${req.body.nombre} , gracias por logear!!!` });
};

usersCtrl.eliminarUsuario = (req, res, next) => {
  const obtenerUsuarioID = req.params.idUser; // obtengo el id del cliente que busca un producto
  const userIndex = usersDB.findIndex(
    (prod) => prod.idUser === parseInt(obtenerUsuarioID)
  ); //0 vs -1
  if (userIndex === -1) {
    res.status(404).json({ mensaje: "No encontrado" });
  } else {
    usersDB.splice(userIndex, 1);
    res.json(usersDB);
  }
};

usersCtrl.actualizarUsuario = (req, res, next) => {
  const obtenerUsuarioID = req.params.idUser; // obtengo el id del cliente que busca un producto
  let existeUsuario = usersDB.find(
    (prod) => prod.idUser === parseInt(obtenerUsuarioID)
  ); //undefined vs arreglo
  if (!existeUsuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  } else {
    existeUsuario.nombre = req.body.nombre;
    existeUsuario.password = req.body.password;
    existeUsuario.email = req.body.email;
    res.json(existeUsuario);
  }
};

module.exports = usersCtrl;
