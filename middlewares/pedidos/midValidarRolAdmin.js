require("dotenv").config();
const Sequelize = require("sequelize");
const connection = require("../../config/db.config");

const usersDB = require("../../models/Users")(connection, Sequelize);

async function midValidarRolAdmin(req, res, next) {
  const params = req.params.idUserAdmin;
  const texto = "admin";
  // const estado = await usersDB.findOne({ params: texto });
  const estado = await usersDB.findOne({ rol: "admin" });
  if (estado) {
    next();
  } else {
    return res.status(500).json({ mensaje: "El usuario no existe" });
  }
}

module.exports = midValidarRolAdmin;
