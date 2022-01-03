require("dotenv").config();
const usersDB = require("../models/Users");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authCtrl = {};
authCtrl.autenticarUsuario = async (req, res) => {
  const { email, password1 } = req.body;
  try {
    //revisar el password1
    let usuario = await usersDB.findOne({ where: { email: email } });
    const passCorrecto = await bcryptjs.compare(password1, usuario.password1);
    if (!passCorrecto) {
      return res.status(404).json({ msg: "Password Incorrecto" });
    }
    const payload = {
      id_user: usuario.id_user,
      role: usuario.role,
    };
    usuario = await usersDB.update(
      { state: "online" },
      { where: { email: email } }
    );
    // si todo es correcto
    // Crear y firmar el JWT
    console.log(payload);

    // firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //1hora
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de confirmacion
        res.json({ token, payload });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// obtiene que usuario esta autenticado
authCtrl.usuarioAutenticado = async (req, res) => {
  const usuario = await usersDB.findOne({
    where: { id_user: req.decoded.id_user },
    attributes: { exclude: ["password1", "state"] },
  });
  res.json(usuario);
};

authCtrl.userDiscontinued = async (req, res) => {
  try {
    const result = await usersDB.update(
      {
        state: req.body.estadoUser,
      },
      { where: { id_user: req.body.id_user } }
    );
    res.json({ message: "The user is discontinued" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = authCtrl;
