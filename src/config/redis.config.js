require("dotenv").config();
const redis = require("redis");
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
});

client.on("error", function (error) {
  console.error(error);
});

client.set("key", "value", redis.print);
client.get("key", redis.print);

module.exports = client;
