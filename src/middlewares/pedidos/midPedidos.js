const usersDB = require("../../models/Users");

function validar_ID(req, res, next) {
  const validacionExistenciaID = usersDB.find(
    (user) => user.idUser == req.params.idUser
  );
  if (validacionExistenciaID) {
    if (validacionExistenciaID.estado == "on") {
      next();
    }
  } else {
    return res.status(500).json({ mensaje: "No estas registrado y/o Logeado" });
  }
}
module.exports = validar_ID;
