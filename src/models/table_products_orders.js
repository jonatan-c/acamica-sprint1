const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const table_products_ordersDB = sequelize.define(
  "producs_orders",
  {
    id_products_orders: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity_product: {
      type: Sequelize.INTEGER,
    },
  },

  {
    timestamps: false,
  }
);

module.exports = table_products_ordersDB;
