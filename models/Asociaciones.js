const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
//Tables
db.PaymentMethodsDB = require("../models/PaymentMethods");
db.OrdersDB = require("../models/Orders");
db.ProductsDB = require("../models/Products");
db.UserDB = require("../models/Users");
db.OrderStatus = require("../models/OrderStatus");
db.Address = require("../models/Address");
db.table_products_orders = require("../models/table_products_orders");

//************** Relaciones One-To-Many ; 1 PM puede tener muchas Ordenes
db.PaymentMethodsDB.hasMany(db.OrdersDB, {
  as: "orders",
  foreignKey: "id_payment_method",
});
db.OrdersDB.belongsTo(db.PaymentMethodsDB, {
  as: "paymentMethods",
  foreignKey: "id_payment_method",
});
//**************Relacion un Usuario puede tener mucchos pedidos. Un pedido puede tener un solo usuairo
db.UserDB.hasMany(db.OrdersDB, {
  as: "orders",
  foreignKey: "id_user",
});
db.OrdersDB.belongsTo(db.UserDB, {
  as: "users",
  foreignKey: "id_user",
});
//***************Relacion stados, un estado puede estar en muchos pedidos, un pedido puede tener un solo estado
db.OrderStatus.hasMany(db.OrdersDB, {
  as: "orders",
  foreignKey: "id_order_status",
});
db.OrdersDB.belongsTo(db.OrderStatus, {
  as: "ordersStatus",
  foreignKey: "id_order_status",
});
//******M:1 o M:M*********Relacion Domicio - Usuario
// Posibilidad 1 : un usuairo puede tener muchos domicilio, un domicilio puede tener 1 usuario
// db.UserDB.hasMany(db.Address, {
//   as: "address",
//   foreignKey: "id_user",
// });
// db.Address.belongsTo(db.UserDB, {
//   as: "users",
//   foreignKey: "id_user",
// });

// M:M Orders Producst

// const OrderProducts = sequelize.define("OrderProducts", {
//   ProductId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: db.ProductsDB,
//       key: "id_product",
//     },
//   },
//   OrderId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: db.OrdersDB,
//       key: "id_order",
//     },
//   },
// });

// db.ProductsDB.belongsToMany(db.OrdersDB, {
//   through: "OrderProducts",
//   // foreignKey: "id_product",
// });
// db.OrdersDB.belongsToMany(db.ProductsDB, {
//   through: "OrderProducts",
//   // foreignKey: "id_order",
// });

// Funciona y crea una tabla , id_orders_pedidos ; id_orders ; id_products
// const table_products_orders = sequelize.define(
//   "producs_orders",
//   {
//     id_products_orders: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );
db.OrdersDB.belongsToMany(db.ProductsDB, {
  as: "Products1",
  through: { model: db.table_products_orders, unique: false },
  foreignKey: "id_order",
});
db.ProductsDB.belongsToMany(db.OrdersDB, {
  as: "Orders1",
  through: { model: db.table_products_orders, unique: false },
  foreignKey: "id_product",
});

module.exports = db;
