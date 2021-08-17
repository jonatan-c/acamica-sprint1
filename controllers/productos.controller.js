const productosDB = require("../models/Productos");

const productosCtrl = {};

//*************************************** [SIN USAR]
productosCtrl.obtenerProductos = (req, res, next) => {
  res.json({ productosDB });
};
//******************************************** [F]
productosCtrl.agregarProducto = (req, res, next) => {
  const newProducto = {};
  newProducto.idProducto = parseInt(16);
  newProducto.nombre = req.body.nombre;
  newProducto.precio = req.body.precio;
  productosDB.push(newProducto);
  res.json({ mensaje: "Se agrego el producto correctamente, gracias Admin" });
};

productosCtrl.obtenerProducto = (req, res, next) => {
  const obtenerProductoID = req.params.idProducto; // obtengo el id del cliente que busca un producto
  const existeProducto = productosDB.find(
    (prod) => prod.idProducto === parseInt(obtenerProductoID)
  ); //undefined vs arreglo
  if (!existeProducto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  } else {
    res.json(existeProducto);
  }
};

//******************************************** [H]
productosCtrl.eliminarProducto = (req, res, next) => {
  const obtenerProductoID = req.params.idProducto;
  const productoIndex = productosDB.findIndex(
    (prod) => prod.idProducto === parseInt(obtenerProductoID)
  ); //0 vs -1
  if (productoIndex === -1) {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  } else {
    productosDB.splice(productosDB, 1);
    res.json({ mensaje: "Producto Eliminado Correctamente" });
  }
};

//******************************************** [G]
productosCtrl.actualizarProducto = (req, res, next) => {
  const obtenerProductoID = req.params.idProducto; // obtengo el id del cliente que busca un producto
  let existeProducto = productosDB.find(
    (prod) => prod.idProducto === parseInt(obtenerProductoID)
  ); //undefined vs arreglo
  if (!existeProducto) {
    return res.status(404).json({ mensaje: "Producto no encontrado" });
  } else {
    existeProducto.nombre = req.body.nombre;
    existeProducto.precio = req.body.precio;
    res.json(existeProducto);
  }
};

module.exports = productosCtrl;
