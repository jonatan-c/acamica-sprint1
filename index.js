const express = require("express");
const app = express();
const port = 4001;
const helmet = require("helmet");

const db = require("./models/Asociaciones");
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Drop and re-sync db.");
});

const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");
const ordersRoutes = require("./routes/orders.routes");
const paymentMethods = require("./routes/paymentMethods.routes");
const authRoutes = require("./routes/auth.routes");

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
    "./routes/users.routes.js",
    "./routes/auth.routes.js",
    "./routes/products.routes.js",
    "./routes/orders.routes.js",
    "./routes/paymentMethods.routes.js",
  ],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
const cors = require("cors");
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
