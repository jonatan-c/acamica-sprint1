require("dotenv").config();

const usersDB = require("../models/Users");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usersCtrl = {};
///*********************************** [A] y [L]
usersCtrl.createUser = async (req, res, next) => {
  try {
    const resp = req.body.password1;
    const salt = await bcryptjs.genSalt(10);
    const respHash = await bcryptjs.hash(resp, salt);
    const newUser = await usersDB.build({
      name: req.body.name,
      email: req.body.email,
      password1: respHash,
      role: "user",
      state: "offline",
    });
    const result = await newUser.save();
    res.status(200).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: "Error to create user" });
  }
};

module.exports = usersCtrl;
