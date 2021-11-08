const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const orderStatusDB = sequelize.define(
  "order_status",
  {
    id_order_status: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },

  {
    timestamps: false,
  }
);

module.exports = orderStatusDB;
