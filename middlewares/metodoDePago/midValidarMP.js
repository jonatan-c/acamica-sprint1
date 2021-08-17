const MediosDePagoDB = require("../../models/MediosDePago");
function midValidarMP(req, res, next) {
  const estado = MediosDePagoDB.find((user) => user.nombre == req.body.nombre);
  if (estado) {
    return res.status(500).json({ mensaje: "El metodo de pago ya existe" });
  } else {
    next();
  }
}
module.exports = midValidarMP;

// valida la entrada NOMBRE de nuevo medio de pago ;
