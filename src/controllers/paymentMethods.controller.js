require("dotenv").config();

const PaymentMethodsDB = require("../models/PaymentMethods");

const paymentMethodsCtrl = {};
//************************************* [N]
paymentMethodsCtrl.addPaymentMethod = async (req, res, next) => {
  try {
    const newPM = await PaymentMethodsDB.build({
      name: req.body.name,
    });
    const result = await newPM.save();
    res.status(200).json({ message: "New payment method added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in adding new payment method" });
  }
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
    res.status(200).json({ message: "Payment method edited successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in editing payment method" });
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
      res.status(200).json({ message: "Payment method deleted successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Payment method doesn't found in database" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in deleting payment method" });
  }
};

//************************************** [Q]
paymentMethodsCtrl.getIdPaymentMethods = async (req, res, next) => {
  try {
    const paymentMethods = await PaymentMethodsDB.findAll();

    res.status(200).json(paymentMethods);
  } catch (error) {
    res.status(500).json({ message: "Error in getting payment methods" });
  }
};

module.exports = paymentMethodsCtrl;
