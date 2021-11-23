require("dotenv").config();

const orderStatusDB = require("../../models/OrderStatus");

async function isIdOrderStatusinDB(req, res, next) {
  const body = await orderStatusDB.findOne({
    where: {
      id_order_status: req.body.id_order_status,
    },
  });
  if (!body) {
    return res
      .status(500)
      .json({ message: "The order status is not in the database" });
  }
  next();
}

module.exports = {
  isIdOrderStatusinDB,
};
