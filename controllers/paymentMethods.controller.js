require("dotenv").config();
const Sequelize = require("sequelize");
const connection = require("../config/db.config");
const PaymentMethodsDB = require("../models/PaymentMethods")(
  connection,
  Sequelize
);

const paymentMethodsCtrl = {};
//************************************* [N]
paymentMethodsCtrl.addPaymentMethod = async (req, res, next) => {
  const newPM = await PaymentMethodsDB.build({
    name: req.body.name,
  });
  const result = await newPM.save();
  res.json({ message: "New payment method added successfully" });
};
//********s***************************** [O]
paymentMethodsCtrl.editPaymentMethod = async (req, res, next) => {
  const idPaymentMethod = parseInt(req.params.idPaymentMethod);
  try {
    const result = await PaymentMethodsDB.update(
      {
        name: req.body.name,
      },
      { where: { id_payment_method: idPaymentMethod } }
    );
    res.json({ message: "Payment method edited successfully" });
  } catch (error) {
    console.log(error);
  }
};

//************************************** [P]
paymentMethodsCtrl.deletePaymentMethod = async (req, res, next) => {
  try {
    const getIdPaymentMethod = parseInt(req.params.idPaymentMethod);
    const result = await PaymentMethodsDB.destroy({
      where: { id_payment_method: getIdPaymentMethod },
    });
    if (result) {
      res.json({ message: "Payment method deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Payment method doesn't found in database" });
    }
  } catch (error) {
    console.log(error);
  }
};

//************************************** [Q]
paymentMethodsCtrl.getIdPaymentMethods = async (req, res, next) => {
  const result = await PaymentMethodsDB.findAll();
  res.json(result);
};

module.exports = paymentMethodsCtrl;
