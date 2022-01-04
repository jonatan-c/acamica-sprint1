const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const AdressDB = sequelize.define(
  "address",
  {
    id_address: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
    },
  },

  {
    timestamps: false,
  }
);

module.exports = AdressDB;
