const usersDB = require("../../models/Users");

function midValidarEstadoAdmin(req, res, next) {
  const validacionExistenciaID = usersDB.find(
    (user) => user.idUser == parseInt(req.params.idUserAdmin)
  );
  if (validacionExistenciaID.estado == "on") {
    next();
  } else {
    return res.status(500).json({ mensaje: "Debes logear" });
  }
}

module.exports = midValidarEstadoAdmin;
