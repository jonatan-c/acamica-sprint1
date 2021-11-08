const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const usersDB = sequelize.define(
  "users",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    password1: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = usersDB;
