const PedidosDB = [
  {
    idPedido: 21,
    idUser: 1,
    pedido: [
      {
        idProducto: 11,
        nombre: "Hamburguesa Doble",
        precio: 1500,
        cantidad: 2,
      },
      {
        idProducto: 13,
        nombre: "Coca",
        precio: 50,
        cantidad: 1,
      },
    ],
    estado: "Pendiente",
    direccion: "Maipu 256",
    metodoDePago: "Efectivo",
  },
  {
    idPedido: 23,
    idUser: 1,
    pedido: [
      {
        idProducto: 13,
        nombre: "Coca",
        precio: 50,
        cantidad: 3,
      },
    ],
    estado: "Entregado",
    direccion: "Maipu 256",
    metodoDePago: "Efectivo",
  },
  {
    idPedido: 22,
    idUser: 2,
    pedido: [
      {
        idProducto: 11,
        nombre: "Hamburguesa Doble",
        precio: 1500,
        cantidad: 3,
      },
    ],
    estado: "Pendiente",
    direccion: "Maipu 256",
    metodoDePago: "Efectivo",
  },
];

module.exports = PedidosDB;
