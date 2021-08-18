const pedidosDB = require("../../models/Pedidos");

function midValidarPedidoExista(req, res, next) {
  const estado = pedidosDB.find((user) => user.idPedido == req.params.idPedido);
  console.log(estado);
  if (estado) {
    next();
  } else {
    return res.status(500).json({ mensaje: "El usuario no existe" });
  }
}
module.exports = midValidarPedidoExista;

// valida que el usuario existe, verifica si esta en BD
