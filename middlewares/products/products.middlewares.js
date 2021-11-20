require("dotenv").config();

const productsDB = require("../../models/Products");

async function hasProductsDB(req, res, next) {
  const result = await productsDB.findOne({});
  if (result) {
    next();
  } else {
    return res.json({ message: "No hay productos" });
  }
}

module.exports = {
  hasProductsDB,
};
