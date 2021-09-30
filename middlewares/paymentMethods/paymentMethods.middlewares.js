require("dotenv").config();
const Sequelize = require("sequelize");
const connection = require("../../config/db.config");

const PaymentMethodsDB = require("../../models/PaymentMethods")(
  connection,
  Sequelize
);

async function isPaymentMethodInDB(req, res, next) {
  // const params = parseInt(req.params.idUserAdmin);
  const estado = await PaymentMethodsDB.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (estado) {
    return res
      .status(500)
      .json({ message: "The payment method is already in the database" });
  } else {
    next();
  }
}

async function isIdinDB(req, res, next) {
  const params = parseInt(req.params.idPaymentMethod);
  const estado = await PaymentMethodsDB.findOne({
    where: {
      id_payment_method: params,
    },
  });
  if (estado) {
    next();
  } else {
    return res.json({ message: "The payment method isn´t in DB" });
  }
}

module.exports = {
  isIdinDB,
  isPaymentMethodInDB,
};
