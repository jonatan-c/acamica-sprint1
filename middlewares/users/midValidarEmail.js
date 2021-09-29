require("dotenv").config();
const Sequelize = require("sequelize");
const connection = require("../../config/db.config");
const usersDB = require("../../models/Users")(connection, Sequelize);

async function midValidarEmail(req, res, next) {
  const userEmail = await usersDB.findOne({ where: { email: req.body.email } });
  console.log(userEmail);
  if (userEmail) {
    return res.status(500).json({ mensaje: "El email ya esta registrado " });
  } else {
    next();
  }
}
module.exports = midValidarEmail;
