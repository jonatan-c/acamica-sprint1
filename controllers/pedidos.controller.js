const pedidosDB = require("../models/Pedidos");

const pedidosCtrl = {};
//************************************ [C] *** tengo dudas
// pedidosCtrl.realizarPedido = (req, res, next) => {
//   const newPedido = {};
//   newPedido.idPedido = parseInt(25);
//   newPedido.idUser = req.params.idUser;
//   newPedido.pedido = req.body;
//   newPedido.estado = "pendiente";

//   pedidosDB.push(newPedido);
//   res.json({ mensaje: "pedido cargado correctamente" });
// };
//**********************[D]
pedidosCtrl.obtenerPedidosIdUser = (req, res, next) => {
  const idUser = req.params.idUser;
  const buscarPedidoIdUser = pedidosDB.filter((ped) => ped.idUser == idUser);
  res.json(buscarPedidoIdUser);
};
//********************** [E_1]
pedidosCtrl.obtenerPedidosIdUserAdmin = (req, res, next) => {
  res.json(pedidosDB);
};
//********************** [E_2]
pedidosCtrl.editarPedidosIdUserAdmin = (req, res, next) => {
  const idPedido = req.params.idPedido;
  const buscar = pedidosDB.find((ped) => ped.idPedido == idPedido);
  if (!buscar) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  } else {
    buscar.estado = req.body.estado;
    res.json(buscar);
  }
};

//********************** [S y T]
pedidosCtrl.editarPedidosIdUser = (req, res, next) => {
  const idPedido = req.params.idPedido;
  const buscar = pedidosDB.find((ped) => ped.idPedido == idPedido);
  console.log(buscar);
  if (!buscar) {
    return res.status(404).json({ mensaje: "Pedido no encontrado" });
  } else {
    buscar.pedido.nombre = req.body.nombre;
    buscar.pedido.precio = req.body.precio;
    res.json(buscar);
  }
};

module.exports = pedidosCtrl;
