const pedidosDB = require("../models/Pedidos");
const productosDB = require("../models/Productos");

const pedidosCtrl = {};
//************************************ [C_P1] *** tengo dudas
pedidosCtrl.obtenerProductos = (req, res, next) => {
  res.json(productosDB);
};
//************************************ [C_P2] *** tengo dudas

pedidosCtrl.realizarPedido = (req, res, next) => {
  const newPedido = {};
  const buscar = productosDB.find(
    (el) => (el.idProducto = req.body.idProducto)
  );
  newPedido.idPedido = parseInt(25);
  newPedido.idUser = req.params.idUser;
  newPedido.pedido = buscar;
  buscar.cantidad = req.body.cantidad;
  // res.json(newPedido);
  pedidosDB.push(newPedido);
  res.json({ mensaje: "Producto Agregado Correctamente a pedidos" });
};
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
  const idProducto = req.params.idProducto;
  const buscar = pedidosDB.find((ped) => ped.idPedido == idPedido);
  // let objetoPedidos = buscar.pedido;
  // let buscadorIdProducto = objetoPedidos.find(
  //   (el) => el.idProducto == idProducto
  // );
  // buscadorIdProducto.cantidad = req.body.cantidad;
  // res.json(buscadorIdProducto);

  if (!buscar) {
    return res.status(404).json({ mensaje: "Pedido no encontrado" });
  } else {
    let objetoPedidos = buscar.pedido;
    let buscadorIdProducto = objetoPedidos.find(
      (el) => el.idProducto == idProducto
    );
    if (!buscadorIdProducto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    } else {
      buscadorIdProducto.cantidad = req.body.cantidad;
      res.json(buscadorIdProducto);
    }
  }
};
module.exports = pedidosCtrl;
