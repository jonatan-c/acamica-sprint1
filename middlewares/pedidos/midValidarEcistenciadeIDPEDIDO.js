const pedidosDB = require("../../models/Pedidos");

function midValidarEcistenciadeIDPEDIDO(req, res, next) {
  const validacionExistenciaID = pedidosDB.find(
    (user) => user.idPedido == parseInt(req.params.idPedido)
  );
  console.log(validacionExistenciaID);
  if (validacionExistenciaID) {
    next();
  } else {
    return res
      .status(500)
      .json({ mensaje: "Lo siento, el IdPedido no existe" });
  }
}

module.exports = midValidarEcistenciadeIDPEDIDO;
