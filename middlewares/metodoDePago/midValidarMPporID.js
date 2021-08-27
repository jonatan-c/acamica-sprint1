const MediosDePagoDB = require("../../models/MediosDePago");

function midValidarMPporID(req, res, next) {
  const estado = MediosDePagoDB.find(
    (user) => user.idMedioDePago == req.params.idMedioDePago
  );
  if (estado) {
    next();
  } else {
    return res
      .status(500)
      .json({ mensaje: "El metodo de pago no existe,no podes editar" });
  }
}
module.exports = midValidarMPporID;

// valida la entrada ID para editar
