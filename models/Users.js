const usersDB = (connection, Sequelize) => {
  const User = connection.define(
    "users",
    {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      password1: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return User;
};

module.exports = usersDB;

// const usersDB = [
//   {
//     idUser: 1,
//     rol: "admin",
//     nombre: "jonatan",
//     password: "claros",
//     email: "jonatan@gmail.com",
//     estado: "on",
//   },
//   {
//     idUser: 2,
//     rol: "user",
//     nombre: "asd",
//     password: "1232131",
//     email: "asd@gmail.com",
//     estado: "on",
//   },
//   {
//     idUser: 4,
//     rol: "admin",
//     nombre: "jonatan4",
//     password: "claros4",
//     email: "jonatan4@gmail.com",
//     estado: "off",
//   },
// ];

// module.exports = usersDB;
