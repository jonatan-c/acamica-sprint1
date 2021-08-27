const pedidosDB = require("../../models/Pedidos");

function midValidarExistenciadeIDPEDIDO(req, res, next) {
  const validacionExistenciaID = pedidosDB.find(
    (user) => user.idPedido == parseInt(req.body.idPedido)
  );
  if (validacionExistenciaID) {
    next();
  } else {
    return res
      .status(500)
      .json({ mensaje: "Lo siento, el IdPedido no existe" });
  }
}

module.exports = midValidarExistenciadeIDPEDIDO;
