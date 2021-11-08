require("dotenv").config();
const jwt = require("jsonwebtoken");
const assert = require("assert");
const fetch = require("node-fetch");

const register = "http://localhost:4001/users/register";
// const fakeRegister = "http://localhost:4001/users/register";

describe("Register", function () {
  it("respuesta registro existoso", async () => {
    const url = `http://localhost:4001/users/register`;
    const result = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: "hola",
        password1: "hola",
        email: "hola",
      }),
    });
    assert.equal(result.status, 200);
  });
});
