require("dotenv").config();

const usersDB = require("../../models/Users");

async function adminIdExist(req, res, next) {
  const params = parseInt(req.params.idAdminUser);
  const estado = await usersDB.findOne({
    where: {
      id_user: params,
    },
  });
  if (estado) {
    next();
  } else {
    return res.status(404).json({ message: "ID User does not exist" });
  }
}

async function isAdminRole(req, res, next) {
  const params = parseInt(req.params.idAdminUser);
  const estado = await usersDB.findOne({
    where: {
      id_user: params,
      role: "admin",
    },
  });
  if (estado) {
    next();
  } else {
    return res.status(403).json({ mensaje: "The user does not ADMIN" });
  }
}

async function isAdminOnline(req, res, next) {
  const params = parseInt(req.params.idAdminUser);
  const estado = await usersDB.findOne({
    where: {
      id_user: params,
      state: "online",
    },
  });
  if (estado) {
    next();
  } else {
    return res.status(403).json({ mensaje: "The admin is not ONLINE" });
  }
}

module.exports = { adminIdExist, isAdminRole, isAdminOnline };
