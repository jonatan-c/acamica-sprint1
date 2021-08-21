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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
//********************************************* PRODUCTOS **********************
app.use("/restaurant", productosRoutes);
//********************************************* USERS **********************
app.use("/restaurant", usersRoutes);
//********************************************* PEDIDOS **********************
app.use("/restaurant", pedidosRoutes);
//********************************************* METODOS DE PAGO **********************
app.use("/restaurant", metodosDePagoRoutes);

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
