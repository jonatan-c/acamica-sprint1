const ordersDB = require("../models/Orders");
const ordersStatusDB = require("../models/OrderStatus");
const productosDB = require("../models/Products");
const table_products_ordersDB = require("../models/table_products_orders");
console.log(table_products_ordersDB);

const pedidosCtrl = {};
//
//
//
//
//

// //************************************ [C_P1] ***
// "/users/:idUser/productos"
pedidosCtrl.obtenerProductos = async (req, res, next) => {
  const result = await productosDB.findAll();
  res.json(result);
};
//************************************ [C_P2]
// "/users/:idUser/productos"
pedidosCtrl.realizarPedido = async (req, res, next) => {
  try {
    const resultOrder = await ordersDB.create({
      id_payment_method: req.body.id_payment_method,
      id_user: req.params.idUser,
      id_order_status: req.body.id_order_status,
    });
    for (let i = 0; i < req.body.products.length; i++) {
      const algo = await table_products_ordersDB.create({
        id_order: resultOrder.id_order,
        id_product: req.body.products[i].id_product,
      });
    }
  } catch (error) {
    console.log(error);
  }

  res.send("Orden Creada");
};

//**********************[D]
pedidosCtrl.obtenerPedidosIdUser = async (req, res, next) => {
  const idUser = req.params.idUser;
  const result = await ordersDB.findAll({
    where: { id_user: idUser },
    include: ["paymentMethods", "ordersStatus", "Products1"],

    // attributes: {
    //   exclude: [
    //     "id_user",
    //     "id_payment_method",
    //     "id_order_status",
    //     "id_products_orders",
    //   ],
    // },
    // include: [{ model: table_products_orders }],
  });
  res.json(result);
};

//********************** [S y T]
pedidosCtrl.editarPedidosIdUser = async (req, res, next) => {
  const idPedido = parseInt(req.params.idPedido);
  const idProducto = parseInt(req.params.id_Producto);
  const idUser = parseInt(req.params.idUser);

  try {
    const result = await ordersDB.update(
      {
        id_payment_method: req.body.id_payment_method,
      },
      { where: { id_order: idPedido } }
    );
    res.json({ message: "editado correctamente" });
  } catch (error) {
    console.log(error);
  }
};
pedidosCtrl.eliminarPedidosIdUser = async (req, res, next) => {
  try {
    const getIDOrder = parseInt(req.params.idPedido);
    const result = await ordersDB.destroy({
      where: { id_order: getIDOrder },
    });
    if (result) {
      res.json({ message: "order deleted successfully" });
    } else {
      res.status(404).json({ message: "order doesn't found in database" });
    }
  } catch (error) {
    console.log(error);
  }
};

// ************************************  ADMIN ************************* //
//********************** [E_1]
pedidosCtrl.obtenerPedidosIdUserAdmin = async (req, res, next) => {
  const result = await ordersDB.findAll();
  res.json(result);
};
//********************** [E_2]
pedidosCtrl.editarPedidosIdUserAdmin = async (req, res, next) => {
  const idPedido = parseInt(req.params.idPedido);
  try {
    const result = await ordersDB.update(
      {
        id_order_status: req.body.id_order_status,
      },
      { where: { id_order: idPedido } }
    );
    res.json({ message: "Status changed correctly" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = pedidosCtrl;
