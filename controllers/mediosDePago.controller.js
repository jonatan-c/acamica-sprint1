require("dotenv").config();
const Sequelize = require("sequelize");
const connection = require("../config/db.config");
const MediosDePagoDB = require("../models/MediosDePago")(connection, Sequelize);

const mediosDePagoCtrl = {};
//************************************* [N]
mediosDePagoCtrl.agregarMedioDePago = async (req, res, next) => {
  const newPago = await MediosDePagoDB.build({
    nombre: req.body.nombre,
  });
  const result = await newPago.save();
  res.json({ mensaje: "Nuevo metodo de pago agregado correctamente" });
};
//********s***************************** [O]
mediosDePagoCtrl.editarMedioDePago = async (req, res, next) => {
  const idMedioDePago = parseInt(req.params.idMedioDePago);
  try {
    const result = await MediosDePagoDB.update(
      {
        nombre: req.body.nombre,
      },
      { where: { id_medio_de_pago: idMedioDePago } }
    );
    res.json(result);
  } catch (error) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  }
};

//************************************** [P]
mediosDePagoCtrl.eliminarMedioDePago = async (req, res, next) => {
  try {
    const obtenerMPID = parseInt(req.params.idMedioDePago);
    const result = await MediosDePagoDB.destroy({
      where: { id_medio_de_pago: obtenerMPID },
    });
    if (result) {
      res.json({ mensaje: "Producto Eliminado Correctamente" });
    } else {
      res.status(404).json({ mensaje: "Producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

//************************************** [Q]
mediosDePagoCtrl.obtenerMediosDePago = async (req, res, next) => {
  const result = await MediosDePagoDB.findAll();
  res.json(result);
};

module.exports = mediosDePagoCtrl;
