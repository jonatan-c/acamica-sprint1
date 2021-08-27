const usersDB = require("../../models/Users");

function midValidarEstadoOnLine(req, res, next) {
  const idUser = req.params.idUser;
  const estado = usersDB.find((user) => user.idUser == idUser);
  if (estado.estado == "on") {
    next();
  } else {
    return res.status(500).json({ mensaje: "Debes hacer login antes" });
  }
}
module.exports = midValidarEstadoOnLine;

// valida que el usuario este online , NO SI ESTA LOGEANDOSE
