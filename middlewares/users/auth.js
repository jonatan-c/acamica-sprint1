const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Leer el token del header
  const token = req.header("x-auth-token");

  //Revisar si no hay token
  if (token) {
    jwt.verify(token, process.env.SECRETA, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
};

// try {
//   const token = req.header("token");
//   if (!token) return res.status(401).json("Access Denied");
//   const payload = jwt.verify(token, process.env, SECRETA || "");
//   console.log(payload);

//   req.userId = payload.id_user;
//   console.log(payload);
//   next();
// } catch (e) {
//   res.status(400).send("Invalid Token");
// }
