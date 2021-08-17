const MediosDePagoDB = require("../models/MediosDePago");

const mediosDePagoCtrl = {};
//************************************* [N]
mediosDePagoCtrl.agregarMedioDePago = (req, res, next) => {
  const newPago = {};
  newPago.idMedioDePago = parseInt(35);
  newPago.nombre = req.body.nombre;
  MediosDePagoDB.push(newPago);
  res.json({ mensaje: "Nuevo metodo de pago agregado correctamente" });
};
//********s***************************** [O]
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

//************************************** [P]
mediosDePagoCtrl.eliminarMedioDePago = (req, res, next) => {
  const obtenerMPID = req.params.idMedioDePago;
  const medioDePagoIndex = MediosDePagoDB.findIndex(
    (prod) => prod.idMedioDePago === parseInt(obtenerMPID)
  ); //0 vs -1
  if (medioDePagoIndex === -1) {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  } else {
    MediosDePagoDB.splice(MediosDePagoDB, 1);
    res.json({ mensaje: "Producto Eliminado Correctamente" });
  }
};

//************************************** [Q]
mediosDePagoCtrl.obtenerMediosDePago = (req, res, next) => {
  res.json({ MediosDePagoDB });
};

module.exports = mediosDePagoCtrl;
