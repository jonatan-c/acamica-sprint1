const usersDB = require("../../models/Users");

function midValidarExistenciaDeUsuarioAdmin(req, res, next) {
  const estado = usersDB.find((user) => user.idUser == req.params.idUserAdmin);
  if (estado) {
    next();
  } else {
    return res.status(500).json({ mensaje: "El usuario no existe" });
  }
}
module.exports = midValidarExistenciaDeUsuarioAdmin;

// valida que el usuario existe, verifica si esta en BD
