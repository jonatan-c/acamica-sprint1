require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT_SERVER || 4000;

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models/Asociaciones");
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");
const ordersRoutes = require("./routes/orders.routes");
const paymentMethods = require("./routes/paymentMethods.routes");
const authRoutes = require("./routes/auth.routes");
const addressRoutes = require("./routes/adress.routes");

// ********************* SWAGGER ************
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Acamica- Restaurant API",
      version: "1.0.0",
    },
  },
  apis: [
    "./src/routes/users.routes.js",
    "./src/routes/auth.routes.js",
    "./src/routes/products.routes.js",
    "./src/routes/orders.routes.js",
    "./src/routes/paymentMethods.routes.js",
    "./src/routes/adress.routes.js",
    // "./src/routes/*.routes.js",
  ],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const helmet = require("helmet");
app.use(helmet());
//routes

app.use("/", authRoutes);
//********************************************* PRODUCTS **********************
app.use("/", productsRoutes);
//********************************************* USERS **********************
app.use("/", usersRoutes);
//********************************************* PEDIDOS **********************
app.use("/", ordersRoutes);
//********************************************* PAYMENT METHODS **********************
app.use("/", paymentMethods);
//********************************************* ADDRESS **********************
app.use("/", addressRoutes);

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
