require("dotenv").config();
const Sequelize = require("sequelize");
const connection = require("../config/db.config");
const ProductsDB = require("../models/Products")(connection, Sequelize);

const productsCtrl = {};

//*************************************** [SIN USAR]
productsCtrl.getProducts = async (req, res, next) => {
  const result = await ProductsDB.findAll();
  res.json(result);
};
//******************************************** [F]
productsCtrl.addProduct = async (req, res, next) => {
  const newProduct = await ProductsDB.build({
    name_product: req.body.name_product,
    price_product: parseInt(req.body.price_product),
    quantity_product: parseInt(req.body.quantity_product),
  });
  const result = await newProduct.save();
  res.json({ mensaje: "Product added successfully, thanks admin" });
};

productsCtrl.getProductbyId = async (req, res, next) => {
  const getIdProduct = parseInt(req.params.idProduct);
  const result = await ProductsDB.findOne({
    where: { id_product: getIdProduct },
  });
  res.json({ result });
};

//******************************************** [H]
productsCtrl.deleteProductbyId = async (req, res, next) => {
  const getIdProduct = parseInt(req.params.idProduct);
  const result = await ProductsDB.destroy({
    where: { id_product: getIdProduct },
  });
  if (result) {
    res.json({ message: "Product  deleted successfully" });
  } else {
    res.status(404).json({ message: "Product doesn't found in database" });
  }
};

//******************************************** [G]
productsCtrl.editProduct = async (req, res, next) => {
  const getIdProduct = parseInt(req.params.idProduct);
  const result = await ProductsDB.update(
    {
      name_product: req.body.name_product,
    },
    { where: { id_product: getIdProduct } }
  );
  if (result) {
    res.json({ message: "Product edited successfully" });
  } else {
    res.status(404).json({ message: "Product doesn't found in database" });
  }
};

module.exports = productsCtrl;
