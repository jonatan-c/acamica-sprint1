require("dotenv").config();

const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis);
const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

//Midlleware cache
const productsCache = async (req, res, next) => {
  const productsOnCache = await client.getAsync("products");
  //   productsOnCache !== null ? res.json(productsOnCache) : next();
  if (productsOnCache !== null) {
    console.log("The Products are in cache");
    res.json(JSON.parse(productsOnCache));
  } else {
    console.log("The Products are NOT in cache");
    next();
  }
};
//bien bien bien bien
module.exports = { productsCache };
