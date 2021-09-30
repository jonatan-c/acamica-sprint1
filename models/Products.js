const ProductsDB = (connection, Sequelize) => {
  const Products = connection.define(
    "products",
    {
      id_product: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name_product: {
        type: Sequelize.STRING,
      },
      price_product: {
        type: Sequelize.INTEGER,
      },
      quantity_product: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
  return Products;
};

module.exports = ProductsDB;

// const productosDB = [
//   {
//     idProducto: 11,
//     nombre: "Hamburguesa Doble",
//     precio: 1500,
//     cantidad: 1,
//   },
//   {
//     idProducto: 12,
//     nombre: "Papas Fritas",
//     precio: 200,
//     cantidad: 1,
//   },
//   {
//     idProducto: 13,
//     nombre: "Coca Cola",
//     precio: 50,
//     cantidad: 1,
//   },
// ];

// module.exports = productosDB;
