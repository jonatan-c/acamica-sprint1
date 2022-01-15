require("dotenv").config();

const productsDB = require("../../models/Products");

async function hasProductsDB(req, res, next) {
  const result = await productsDB.findOne({});
  if (result) {
    next();
  } else {
    return res
      .status(404)
      .json({ message: "There are no products in the database" });
  }
}

async function isIdProductInDb(req, res, next) {
  const getIdProduct = parseInt(req.params.idProduct);
  const result = await productsDB.findOne({
    where: { id_product: getIdProduct },
  });
  if (result) {
    next();
  } else {
    return res.status(404).json({ message: "This product does not exist" });
  }
}

module.exports = {
  hasProductsDB,
  isIdProductInDb,
};
