require("dotenv").config();

const ordersDB = require("../../models/Orders");
const statusOrder = require("../../models/OrderStatus");

async function isOrderPending(req, res, next) {
  const result = await ordersDB.findOne({
    where: { id_order: req.params.idOrder, id_order_status: 1 },
  });
  if (result) {
    next();
  } else {
    return res.status(500).json({ mensaje: "The order is not pending." });
  }
}

async function isOrderInDB(req, res, next) {
  const result = await ordersDB.findOne({
    where: {
      id_user: req.params.idUser,
      id_order: req.body.id_order,
    },
  });
  if (result) {
    next();
  } else {
    return res
      .status(500)
      .json({ mensaje: "The order is not in the database." });
  }
}
async function isOrderInDBparams(req, res, next) {
  const result = await ordersDB.findOne({
    where: {
      id_order: req.params.irOrder,
      id_user: req.params.idUser,
    },
  });
  if (result) {
    next();
  } else {
    return res
      .status(500)
      .json({ mensaje: "The order is not in the database." });
  }
}

module.exports = { isOrderPending, isOrderInDB, isOrderInDBparams };
