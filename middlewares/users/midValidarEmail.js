const usersDB = require("../../models/Users");

function midValidarEmail(req, res, next) {
  const userEmail = usersDB.find((user) => user.email === req.body.email);
  if (userEmail) {
    return res.status(500).json({ mensaje: "El email ya esta registrado " });
  } else {
    next();
  }
}
module.exports = midValidarEmail;

// valida que el email no se repita
