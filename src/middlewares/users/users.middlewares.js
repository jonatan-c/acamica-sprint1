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

const isEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (regex.test(email)) {
      next();
    } else {
      return res.status(200).json({
        message: "Email is not valid, must be like: email@email.com",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Error validating email",
      error,
    });
  }
};

const isPasswordValid = async (req, res, next) => {
  try {
    const password1 = req.body.password1;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,25}$/;
    if (regex.test(password1)) {
      next();
    } else {
      return res.status(400).json({
        message:
          "Password is not valid, must be have, 8-25 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error validating password",
      error,
    });
  }
};

module.exports = {
  isEmailValid,
  isUserOnline,
  existIdUser,
  isUserSuspendido,
  isEmailInDB,
  isEmail,
  isPasswordValid,
};
