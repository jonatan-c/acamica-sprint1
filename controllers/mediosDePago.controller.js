const MediosDePagoDB = require("../models/MediosDePago");

const mediosDePagoCtrl = {};

mediosDePagoCtrl.agregarMedioDePago = (req, res, next) => {
  const newPago = {};
  newPago.idMedioDePago = parseInt(35);
  newPago.nombre = req.body.nombre;
  MediosDePagoDB.push(newPago);
  res.json({ mensaje: "Nuevo metodo de pago agregado correctamente" });
};

mediosDePagoCtrl.editarMedioDePago = (req, res, next) => {
  const idMedioDePago = req.params.idMedioDePago;
  const buscar = MediosDePagoDB.find(
    (ped) => ped.idMedioDePago == idMedioDePago
  );
  if (!buscar) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  } else {
    buscar.nombre = req.body.nombre;
    res.json(buscar);
  }
};

module.exports = mediosDePagoCtrl;
