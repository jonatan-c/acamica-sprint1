const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Leer el token del header
  const token = req.header("x-auth-token");

  //Revisar si no hay token
  if (token) {
    jwt.verify(token, process.env.SECRETA, (err, decoded) => {
      if (err) {
        return res.status(403).json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        console.log(req.decoded);
        next();
      }
    });
  } else {
    res.status(403).send({
      mensaje: "Token no proveída.",
    });
  }
};

const isAdmin = (req, res, next) => {
  // Leer el token del header
  const token = req.header("x-auth-token");

  //Revisar si no hay token
  if (token) {
    jwt.verify(token, process.env.SECRETA, (err, decoded) => {
      if (err) {
        return res.status(403).json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        if (req.decoded.role == "admin") {
          next();
        } else {
          return res.status(403).json({
            msg: "You are not ADMIN",
          });
        }
      }
    });
  } else {
    res.status(403).send({
      mensaje: "Token no proveída.",
    });
  }
};

const isAuthIdUserParams = (req, res, next) => {
  // Leer el token del header
  const token = req.header("x-auth-token");

  //Revisar si no hay token
  if (token) {
    jwt.verify(token, process.env.SECRETA, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        if (req.decoded.id_user == req.params.idUser) {
          next();
        } else {
          return res.json({
            msg: "You are not the user login",
          });
        }
      }
    });
  } else {
    res.status(403).send({
      mensaje: "Token no proveída.",
    });
  }
};

const isAuthIdAdminUserParams = (req, res, next) => {
  // Leer el token del header
  const token = req.header("x-auth-token");

  //Revisar si no hay token
  if (token) {
    jwt.verify(token, process.env.SECRETA, (err, decoded) => {
      if (err) {
        return res.status(403).json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        if (req.decoded.id_user == req.params.idAdminUser) {
          next();
        } else {
          return res.status(403).json({
            msg: "You are not the user login",
          });
        }
      }
    });
  } else {
    res.status(403).send({
      mensaje: "Token no proveída.",
    });
  }
};

module.exports = { auth, isAdmin, isAuthIdUserParams, isAuthIdAdminUserParams };
