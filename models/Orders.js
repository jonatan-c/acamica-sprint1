const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const ordersDB = sequelize.define(
  "orders",
  {
    id_order: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = ordersDB;
