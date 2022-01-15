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
      .status(404)
      .json({ message: "The address is not in the database" });
  }
  next();
}
async function isIdAddressinDBParams(req, res, next) {
  const body = await addressDB.findOne({
    where: {
      id_address: req.params.idAddress,
      id_user: req.params.idUser,
    },
  });
  if (!body) {
    return res
      .status(404)
      .json({ message: "The address is not in the database" });
  }
  next();
}

module.exports = {
  isIdAddressinDB,
  isIdAddressinDBParams,
};
