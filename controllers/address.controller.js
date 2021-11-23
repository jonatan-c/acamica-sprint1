require("dotenv").config();

const addressDB = require("../models/Address");

const addressCtrl = {};

addressCtrl.getAddress = async (req, res) => {
  const address = await addressDB.findAll({
    where: {
      id_user: req.params.idUser,
    },
  });
  res.json(address);
};

addressCtrl.addAddress = async (req, res) => {
  const newAddress = await addressDB.build({
    id_user: req.params.idUser,
    name: req.body.name,
    number: req.body.number,
  });
  const result = await newAddress.save();
  res.json({ message: "New address added successfully" });
};

addressCtrl.editAddress = async (req, res) => {
  const idAddress = parseInt(req.params.idAddress);
  try {
    const result = await addressDB.update(
      {
        name: req.body.name,
        number: req.body.number,
      },
      { where: { id_address: idAddress } }
    );
    res.json({ message: "Address updated successfully" });
  } catch (error) {
    console.log(error);
  }
};

addressCtrl.deleteAddress = async (req, res) => {
  try {
    const result = await addressDB.destroy({
      where: { id_address: req.params.idAddress },
    });
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = addressCtrl;
