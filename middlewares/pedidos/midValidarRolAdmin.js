const usersDB = require("../../models/Users");

function midValidarRolAdmin(req, res, next) {
  const validacionExistenciaID = usersDB.find(
    (user) => user.idUser == parseInt(req.params.idUserAdmin)
  );
  if (validacionExistenciaID.rol == "admin") {
    next();
  } else {
    return res.status(500).json({ mensaje: "No eres Admin" });
  }
}

module.exports = midValidarRolAdmin;
