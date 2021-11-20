require("dotenv").config();

const usersDB = require("../../models/Users");

async function isEmailValid(req, res, next) {
  const userEmail = await usersDB.findOne({ where: { email: req.body.email } });
  if (userEmail) {
    return res.status(500).json({ mensaje: "The email is already in use." });
  } else {
    next();
  }
}
async function isUserOnline(req, res, next) {
  const params = parseInt(req.params.idUser);
  const estado = await usersDB.findOne({
    where: {
      id_user: params,
      state: "online",
    },
  });
  if (estado) {
    next();
  } else {
    return res.status(500).json({ mensaje: "The user isn´t ONLINE" });
  }
}

module.exports = { isEmailValid, isUserOnline };

// // por modificar
// const usersDB = require("../../models/Users");

// function midValidarEstadoOnLine(req, res, next) {
//   const idUser = req.params.idUser;
//   const estado = usersDB.find((user) => user.idUser == idUser);
//   if (estado.estado == "on") {
//     next();
//   } else {
//     return res.status(500).json({ mensaje: "Debes hacer login antes" });
//   }
// }
// module.exports = midValidarEstadoOnLine;

// // valida que el usuario este online , NO SI ESTA LOGEANDOSE
// const usersDB = require("../../models/Users");

// function midValidarExistenciaDeUsuario(req, res, next) {
//   const estado = usersDB.find((user) => user.idUser == req.params.idUser);
//   if (estado) {
//     next();
//   } else {
//     return res.status(500).json({ mensaje: "El usuario no existe" });
//   }
// }
// module.exports = midValidarExistenciaDeUsuario;

// const usersDB = require("../../models/Users");

// function midValidarLogin(req, res, next) {
//   const login = usersDB.find(
//     (user) =>
//       user.nombre === req.body.nombre && user.password === req.body.password
//   );

//   if (login) {
//     login.estado = "on";
//     next();
//   } else {
//     return res.status(500).json({ mensaje: "Datos ingresados incorrectos" });
//   }
// }
// module.exports = midValidarLogin;
