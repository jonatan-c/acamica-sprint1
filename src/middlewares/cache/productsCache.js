require("dotenv").config();
const productDB = require("../../models/Products");

const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis);
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
});

//Midlleware cache
const productsCache = async (req, res, next) => {
  const productsDB = await productDB.findAll();
  const productsDBJSON = JSON.stringify(productsDB);
  const productsOnCache = await client.getAsync("products");
  //   productsOnCache !== null ? res.json(productsOnCache) : next();
  if (productsOnCache !== productsDBJSON) {
    console.log("The Products are NOT in cache");
    next();
  } else {
    console.log("The Products are in cache");
    res.status(200).json(JSON.parse(productsOnCache));
  }
};

module.exports = { productsCache };
