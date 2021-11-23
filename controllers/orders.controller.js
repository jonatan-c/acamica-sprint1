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
pedidosCtrl.getProducts = async (req, res, next) => {
  const result = await productosDB.findAll();
  res.json(result);
};
//************************************ [C_P2]
// "/users/:idUser/productos"
pedidosCtrl.createOrder = async (req, res, next) => {
  try {
    const resultOrder = await ordersDB.create({
      id_payment_method: req.body.id_payment_method,
      id_user: req.params.idUser,
      id_order_status: req.body.id_order_status,
    });
    res.json("Order created successfully ");
  } catch (error) {
    console.log(error);
  }
};

pedidosCtrl.associateProducts = async (req, res, next) => {
  try {
    const result = await table_products_ordersDB.create({
      id_order: req.body.id_order,
      id_product: req.body.id_product,
      quantity_product: req.body.quantity_product,
    });
  } catch (error) {
    console.log(error);
  }
  res.send("Productos Asociados");
};

//**********************[D]
pedidosCtrl.getOrderByIdUser = async (req, res, next) => {
  const idUser = req.params.idUser;
  const result = await ordersDB.findAll({
    where: { id_user: idUser },
    include: ["paymentMethods", "ordersStatus", "Products1"],
  });
  res.json(result);
};

//********************** [S y T]
pedidosCtrl.editOrderIdByUser = async (req, res, next) => {
  try {
    const result = await table_products_ordersDB.update(
      {
        quantity_product: req.body.quantity_product,
      },
      {
        where: {
          id_product: req.params.idProduct,
          id_order: req.params.idOrder,
        },
      }
    );
    res.json({ message: "Quantity changed correctly" });
  } catch (error) {
    console.log(error);
  }
};
pedidosCtrl.eliminarPedidosIdUser = async (req, res, next) => {
  try {
    const pedidoEncontrado = await ordersDB.findOne({
      where: { id_order: req.params.idPedido },
    });
    if (pedidoEncontrado) {
      const getIDProduct = parseInt(req.params.idProduct);
      const result = await table_products_ordersDB.destroy({
        where: { id_product: getIDProduct },
      });
      if (result) {
        res.json({ message: " eliminado successfully" });
      } else {
        res.status(404).json({ message: "order doesn't found in database" });
      }
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
