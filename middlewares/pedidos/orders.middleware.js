require("dotenv").config();

const ordersDB = require("../../models/Orders");
const statusOrder = require("../../models/OrderStatus");

async function isOrderPending(req, res, next) {
  const result = await statusOrder.findOne({
    where: { id_order_status: req.body.id_order_status },
  });
  if (result) {
    next();
  } else {
    return res.status(500).json({ mensaje: "The order is not pending." });
  }
}
module.exports = { isOrderPending };
