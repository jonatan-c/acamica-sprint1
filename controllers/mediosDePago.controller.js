const MediosDePagoDB = require("../models/MediosDePago");

const mediosDePagoCtrl = {};

mediosDePagoCtrl.agregarMedioDePagoAPedido = (req, res, next) => {
  const pagoID = req.params.idMedioDePago;
  const buscarCualMPes = MediosDePagoDb.find(
    (mp) => mp.idMedioDePago == pagoID
  );
  console.log(buscarCualMPes);
};

module.exports = mediosDePagoCtrl;
