require("dotenv").config();

const ProductsDB = require("../models/Products");
const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
});

const productsCtrl = {};

//***************************************
productsCtrl.getProducts = async (req, res, next) => {
  try {
    const allProducts = await ProductsDB.findAll();
    client.set(
      "products",
      JSON.stringify(allProducts),
      "EX",
      10 * 60 * 60,
      (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error to get all products" });
        }
      }
    );
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Error to get all products" });
  }
};
//******************************************** [F]
productsCtrl.addProduct = async (req, res, next) => {
  try {
    const newProduct = await ProductsDB.build({
      name_product: req.body.name_product,
      price_product: parseInt(req.body.price_product),
    });
    const result = await newProduct.save();
    res
      .status(200)
      .json({ mensaje: "Product added successfully, thanks admin" });
  } catch (error) {
    res.status(500).json({ message: "Error in adding new product" });
  }
};

productsCtrl.getProductbyId = async (req, res, next) => {
  try {
    const getIdProduct = parseInt(req.params.idProduct);
    const result = await ProductsDB.findOne({
      where: { id_product: getIdProduct },
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Error to get product" });
  }
};

//******************************************** [H]
productsCtrl.deleteProductbyId = async (req, res, next) => {
  try {
    const getIdProduct = parseInt(req.params.idProduct);
    const result = await ProductsDB.destroy({
      where: { id_product: getIdProduct },
    });
    if (result) {
      res.status(200).json({ message: "Product  deleted successfully" });
    } else {
      res.status(404).json({ message: "Product doesn't found in database" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error to delete product" });
  }
};

//******************************************** [G]
productsCtrl.editProduct = async (req, res, next) => {
  try {
    const getIdProduct = parseInt(req.params.idProduct);
    const result = await ProductsDB.update(
      {
        name_product: req.body.name_product,
        price_product: parseInt(req.body.price_product),
      },
      { where: { id_product: getIdProduct } }
    );
    if (result) {
      res.status(200).json({ message: "Product edited successfully" });
    } else {
      res.status(404).json({ message: "Product doesn't found in database" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error in editing product" });
  }
};

module.exports = productsCtrl;
