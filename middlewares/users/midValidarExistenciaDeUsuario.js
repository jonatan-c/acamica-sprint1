const usersDB = require("../../models/Users");

function midValidarExistenciaDeUsuario(req, res, next) {
  const estado = usersDB.find((user) => user.idUser == req.params.idUser);
  // console.log(estado);
  if (estado) {
    next();
  } else {
    return res.status(500).json({ mensaje: "El usuario no existe" });
  }
}
module.exports = midValidarExistenciaDeUsuario;

// valida que el usuario existe, verifica si esta en BD
