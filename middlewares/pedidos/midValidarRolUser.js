const usersDB = require("../../models/Users");

function midValidarRolUser(req, res, next) {
  const validacionExistenciaID = usersDB.find(
    (user) => user.idUser == parseInt(req.params.idUser)
  );
  if (validacionExistenciaID.rol == "user") {
    next();
  } else {
    return res.status(500).json({ mensaje: "No eres user" });
  }
}

module.exports = midValidarRolUser;
