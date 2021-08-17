const usersDB = require("../../models/Users");

function midValidarLogin(req, res, next) {
  const login = usersDB.find(
    (user) =>
      user.nombre === req.body.nombre && user.password === req.body.password
  );
  if (login) {
    login.estado = "on";
    next();
  } else {
    return res.status(500).json({ mensaje: "Datos ingresados incorrectos" });
  }
}
module.exports = midValidarLogin;
