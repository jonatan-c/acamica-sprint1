require("dotenv").config();

const addressDB = require("../../models/Address");

async function isIdAddressinDB(req, res, next) {
  const body = await addressDB.findOne({
    where: {
      id_address: req.body.id_address,
      id_user: req.params.idUser,
    },
  });
  if (!body) {
    return res
      .status(500)
      .json({ message: "The address is not in the database" });
  }
  next();
}

module.exports = {
  isIdAddressinDB,
};
