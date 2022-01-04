const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const ProductsDB = sequelize.define(
  "products",
  {
    id_product: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_product: {
      type: Sequelize.STRING,
    },
    price_product: {
      type: Sequelize.INTEGER,
    },
    // quantity_product: {
    //   type: Sequelize.INTEGER,
    // },
  },
  {
    timestamps: false,
  }
);

module.exports = ProductsDB;
