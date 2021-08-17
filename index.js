const express = require("express");
const app = express();
const productosRoutes = require("./routes/productos.routes");
const usersRoutes = require("./routes/users.routes");
const pedidosRoutes = require("./routes/pedidos.routes");
const metodosDePagoRoutes = require("./routes/mediosDePago.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
//********************************************* PRODUCTOS **********************
app.use("/restuarant", productosRoutes);
//********************************************* USERS **********************
app.use("/restuarant", usersRoutes);
//********************************************* PEDIDOS **********************
app.use("/restuarant", pedidosRoutes);
//********************************************* METODOS DE PAGO **********************
app.use("/restuarant", metodosDePagoRoutes);

app.listen(6000, () => {
  console.log("Servidor en 6000");
});
