const ordersDB = require("../models/Orders");
const ordersStatusDB = require("../models/OrderStatus");
const productosDB = require("../models/Products");
const table_products_ordersDB = require("../models/table_products_orders");
const addressDB = require("../models/Address");

const pedidosCtrl = {};

// //************************************ [C_P1] ***
pedidosCtrl.getProducts = async (req, res, next) => {
  try {
    const result = await productosDB.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error to get all products" });
  }
};
//************************************ [C_P2]
pedidosCtrl.createOrder = async (req, res, next) => {
  try {
    const resultOrder = await ordersDB.create({
      id_payment_method: req.body.id_payment_method,
      id_user: req.params.idUser,
      id_order_status: req.body.id_order_status,
      id_address: req.body.id_address,
    });
    res.status(200).json("Order created successfully ");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error to create order" });
  }
};

pedidosCtrl.associateProducts = async (req, res, next) => {
  try {
    const result = await table_products_ordersDB.create({
      id_order: req.body.id_order,
      id_product: req.body.id_product,
      quantity_product: req.body.quantity_product,
    });
    res.status(200).json({ message: "Product associated correctly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error to associate product" });
  }
};

//**********************[D]
pedidosCtrl.getOrderByIdUser = async (req, res, next) => {
  try {
    const idUser = req.params.idUser;
    const result = await ordersDB.findAll({
      where: { id_user: idUser },
      include: ["paymentMethods", "ordersStatus", "Products1", "address2"],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error to get order by id user" });
  }
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
    res.status(200).json({ message: "Quantity changed correctly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error to change quantity" });
  }
};
pedidosCtrl.eliminarPedidosIdUser = async (req, res, next) => {
  try {
    const result = await table_products_ordersDB.destroy({
      where: {
        id_product: req.params.idProduct,
        id_order: req.params.idOrder,
      },
    });
    res.status(200).json({ message: "Product deleted correctly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error to delete product" });
  }
};

// ************************************  ADMIN ************************* //
//********************** [E_1]
pedidosCtrl.obtenerPedidosIdUserAdmin = async (req, res, next) => {
  try {
    const result = await ordersDB.findAll({
      include: ["paymentMethods", "ordersStatus", "Products1", "address2"],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error to get order by id user" });
  }
};
//********************** [E_2]
pedidosCtrl.editarPedidosIdUserAdmin = async (req, res, next) => {
  const idPedido = parseInt(req.params.idOrder);
  try {
    const result = await ordersDB.update(
      {
        id_order_status: req.body.id_order_status,
      },
      { where: { id_order: idPedido } }
    );
    res.status(200).json({ message: "Status changed correctly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error to change status" });
  }
};
module.exports = pedidosCtrl;
