require("dotenv").config();

const usersDB = require("../../models/Users");

async function isEmailValid(req, res, next) {
  const userEmail = await usersDB.findOne({ where: { email: req.body.email } });
  if (userEmail) {
    return res.status(200).json({ mensaje: "The email is already in use." });
  } else {
    next();
  }
}
async function isUserOnline(req, res, next) {
  const params = parseInt(req.params.idUser);
  const estado = await usersDB.findOne({
    where: {
      id_user: params,
      state: "online",
    },
  });
  if (estado) {
    next();
  } else {
    return res.status(200).json({ mensaje: "The user is not ONLINE" });
  }
}

async function existIdUser(req, res, next) {
  const body = parseInt(req.body.id_user);
  const user = await usersDB.findOne({
    where: {
      id_user: body,
    },
  });
  if (user) {
    next();
  } else {
    return res.status(404).json({ mensaje: "The user does not  exist" });
  }
}

async function isUserSuspendido(req, res, next) {
  const email = await usersDB.findOne({
    where: { email: req.body.email, state: "discontinued" },
  });
  if (email) {
    return res
      .status(403)
      .json({ mensaje: "The user is discontinued, you can not login" });
  } else {
    next();
  }
}

async function isEmailInDB(req, res, next) {
  const email = await usersDB.findOne({ where: { email: req.body.email } });
  if (email) {
    next();
  } else {
    return res.status(404).json({ mensaje: "The email does not exist" });
  }
}

module.exports = {
  isEmailValid,
  isUserOnline,
  existIdUser,
  isUserSuspendido,
  isEmailInDB,
};
