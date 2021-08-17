const pedidosDB = require("../../models/Pedidos");

function midValidarEstadoPedido(req, res, next) {
  const validacionExistenciaID = pedidosDB.find(
    (user) => user.idPedido == parseInt(req.params.idPedido)
  );
  if (validacionExistenciaID.estado == "Pendiente") {
    next();
  } else {
    return res
      .status(500)
      .json({ mensaje: "Lo siento, tu pedido ya fue cerrado" });
  }
}

module.exports = midValidarEstadoPedido;
