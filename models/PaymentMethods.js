const PaymentMethodsDB = (connection, Sequelize) => {
  const PaymentMethods = connection.define(
    "payment_methods",
    {
      id_payment_method: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return PaymentMethods;
};

module.exports = PaymentMethodsDB;
