const express = require("express");
const app = express();
const port = 6001;
const productosRoutes = require("./routes/productos.routes");
const usersRoutes = require("./routes/users.routes");
const pedidosRoutes = require("./routes/pedidos.routes");
const metodosDePagoRoutes = require("./routes/mediosDePago.routes");

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
    "./routes/productos.routes.js",
    "./routes/pedidos.routes.js",
    "./routes/mediosDePago.routes.js",
  ],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
//********************************************* PRODUCTOS **********************
app.use("/", productosRoutes);
//********************************************* USERS **********************
app.use("/", usersRoutes);
//********************************************* PEDIDOS **********************
app.use("/", pedidosRoutes);
//********************************************* METODOS DE PAGO **********************
app.use("/", metodosDePagoRoutes);

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
