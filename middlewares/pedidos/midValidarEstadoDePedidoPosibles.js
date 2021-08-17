const pedidosDB = require("../../models/Pedidos");

function midValidarEstadoDePedidoPosibles(req, res, next) {
  const valoresPosible = req.body.estado;
  //   console.log(valoresPosible);
  if (
    valoresPosible == "Pendiente" ||
    valoresPosible == "Confirmado" ||
    valoresPosible == "En Preparacion" ||
    valoresPosible == "Enviado" ||
    valoresPosible == "Entregado"
  ) {
    next();
  } else {
    return res
      .status(500)
      .json({ mensaje: "No existe ese estado, elegir otro" });
  }
}

module.exports = midValidarEstadoDePedidoPosibles;
