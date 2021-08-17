const { Router } = require("express");
const router = Router();

const midValidarExistenciaDeUsuarioAdmin = require("../middlewares/pedidos/midValidarExistenciaDeUsuarioAdmin");
const midValidarEstadoAdmin = require("../middlewares/pedidos/midValidarEstadoAdmin");
const midValidarRolAdmin = require("../middlewares/pedidos/midValidarRolAdmin");

const {
  obtenerProductos,
  agregarProducto,
  obtenerProducto,
  eliminarProducto,
  actualizarProducto,
} = require("../controllers/productos.controller");

router.get("/productos", obtenerProductos);
//******************************************** [F]
router.post(
  "/users/:idUserAdmin/productos",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  agregarProducto
); // [F]
//******************************************** [G]
router.put(
  "/users/:idUserAdmin/productos/:idProducto",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  actualizarProducto
); // solo por admin [G]

//******************************************** [H]
router.delete(
  "/users/:idUserAdmin/productos/:idProducto",
  midValidarExistenciaDeUsuarioAdmin,
  midValidarEstadoAdmin,
  midValidarRolAdmin,
  eliminarProducto
); //[H];

module.exports = router;
