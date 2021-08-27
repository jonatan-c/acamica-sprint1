const pedidosDB = require("../models/Pedidos");
const productosDB = require("../models/Productos");
const MediosDePagoDB = require("../models/MediosDePago");

const pedidosCtrl = {};
//************************************ [C_P1] ***
pedidosCtrl.obtenerProductos = (req, res, next) => {
  res.json(productosDB);
};
//************************************ [C_P2]
// "/users/:idUser/productos"
pedidosCtrl.realizarPedido = (req, res, next) => {
  const newPedido = {};

  const buscarIdUserPedido = pedidosDB.find(
    (el) => el.idUser == req.params.idUser
  );

  const buscarIDUserPEdidoARRAY = [buscarIdUserPedido];

  const comprobacionPEdido = buscarIDUserPEdidoARRAY.find(
    (el) => el.idPedido == req.body.idPedido
  );
  if (comprobacionPEdido) {
    const arreglodePedido = comprobacionPEdido.pedido;
    newPedido.idProducto = req.body.idProducto;
    newPedido.cantidad = req.body.cantidad;
    arreglodePedido.push(newPedido);
  } else {
    newPedido.idPedido = parseInt(35);
    newPedido.idUser = req.params.idUser;
    const buscarProducto = productosDB.find(
      (el) => el.idProducto == req.body.idProducto
    );
    buscarProducto.cantidad = req.body.cantidad;
    newPedido.pedido = [buscarProducto];
    newPedido.estado = "Pendiente";
    newPedido.direccion = req.body.direccion;
    const buscarIDMP = MediosDePagoDB.find(
      (el) => el.idMedioDePago == req.body.idMedioDePago
    );
    newPedido.metodoDePago = buscarIDMP.nombre;
    pedidosDB.push(newPedido);
  }
  //

  res.json({ mensaje: "Producto/s Agregado Correctamente a pedidos" });
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
    return res.status(404).json({ mensaje: "Pedido no encontrado" });
  } else {
    buscar.estado = req.body.estado;
    res.json(buscar);
  }
};

//********************** [S y T]
pedidosCtrl.editarPedidosIdUser = (req, res, next) => {
  const idPedido = req.params.idPedido;
  const idProducto = req.body.idProducto;
  const buscar = pedidosDB.find((ped) => ped.idPedido == idPedido);
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
      res.json("Pedido editado Correctamente");
    }
  }
};

pedidosCtrl.eliminarPedidosIdUser = (req, res, next) => {
  const idPedido = req.params.idPedido;
  const idProducto = req.body.idProducto;
  const buscar = pedidosDB.find((ped) => ped.idPedido == idPedido);

  if (!buscar) {
    return res.status(404).json({ mensaje: "Pedido no encontrado" });
  } else {
    const buscarBD = buscar.pedido;
    const productoIndex = buscarBD.findIndex(
      (prod) => prod.idProducto === parseInt(idProducto)
    ); //0 vs -1
    if (productoIndex === -1) {
      res.status(404).json({ mensaje: "Producto no encontrado" });
    } else {
      buscarBD.splice(productoIndex, 1);
      res.json({ mensaje: "Producto Eliminado Correctamente" });
    }
  }
};

module.exports = pedidosCtrl;
