const MediosDePagoDB = (connection, Sequelize) => {
  const MediosPago = connection.define(
    "medios_de_pago",
    {
      id_medio_de_pago: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return MediosPago;
};

module.exports = MediosDePagoDB;

// const MediosDePagoDB = [
//   {
//     idMedioDePago: 31,
//     nombre: "Efectivo",
//   },
//   {
//     idMedioDePago: 32,
//     nombre: "Tarjeta de credito",
//   },
//   {
//     idMedioDePago: 33,
//     nombre: "Tarjeta de debito",
//   },
// ];

// module.exports = MediosDePagoDB;
