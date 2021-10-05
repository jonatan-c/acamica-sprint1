const express = require("express");
const app = express();
const port = 6001;
const helmet = require("helmet");

const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");
const pedidosRoutes = require("./routes/pedidos.routes");
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
    "./routes/products.routes.js",
    "./routes/pedidos.routes.js",
    "./routes/paymentMethods.routes.js",
    "./routes/auth.routes",
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
// app.use("/", pedidosRoutes);
//********************************************* PAYMENT METHODS **********************
app.use("/", paymentMethods);

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
