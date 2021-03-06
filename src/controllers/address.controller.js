require("dotenv").config();

const addressDB = require("../models/Address");

const addressCtrl = {};

addressCtrl.getAddress = async (req, res) => {
  try {
    const address = await addressDB.findAll({
      where: {
        id_user: req.params.idUser,
      },
    });
    res.status(200).json(address);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting address" });
  }
};

addressCtrl.addAddress = async (req, res) => {
  try {
    const newAddress = await addressDB.build({
      id_user: req.params.idUser,
      name: req.body.name,
      number: req.body.number,
    });
    const result = await newAddress.save();
    res.status(200).json({ message: "New address added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding new address" });
  }
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
    res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating address" });
  }
};

addressCtrl.deleteAddress = async (req, res) => {
  try {
    const result = await addressDB.destroy({
      where: { id_address: req.params.idAddress },
    });
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting address" });
  }
};

module.exports = addressCtrl;
