require("dotenv").config();
const Sequelize = require("sequelize");
const connection = require("../../config/db.config");

const usersDB = require("../../models/Users")(connection, Sequelize);

async function midValidarExistenciaDeUsuarioAdmin(req, res, next) {
  const params = req.params.idUserAdmin;
  const estado = await usersDB.findOne({ id_user: params });
  if (estado) {
    next();
  } else {
    return res.status(500).json({ mensaje: "El usuario no existe" });
  }
}
module.exports = midValidarExistenciaDeUsuarioAdmin;
