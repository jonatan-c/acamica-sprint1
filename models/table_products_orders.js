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
  },
  {
    timestamps: false,
  }
);

module.exports = table_products_ordersDB;
