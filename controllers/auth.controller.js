require("dotenv").config();
const Sequelize = require("sequelize");
const connection = require("../config/db.config");

const usersDB = require("../models/Users")(connection, Sequelize);

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
        res.json({ message: "Login correct", token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// obtiene que usuario esta autenticado
authCtrl.usuarioAutenticado = async (req, res) => {
  const result = await usersDB.findAll();
  res.json(result);

  // try {
  //   // aca falta la menera que muestre todos los datos, menos el de password
  //   const usuario = await usersDB.findOne({
  //     where: { email: req.body.email },
  //   });
  //   res.json({ message: "Login successfully, you can buy! ", usuario });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({ msg: "Hubo un error" });
  // }
  console.log("paso midle");
};

module.exports = authCtrl;
