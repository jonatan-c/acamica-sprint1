const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const PaymentMethodsDB = sequelize.define(
  "payment_methods",
  {
    id_payment_method: {
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

module.exports = PaymentMethodsDB;
