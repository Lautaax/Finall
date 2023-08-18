// import { Server } from "socket.io";
// //import ProductManager from "./dao/dbManagers/productdbManager.js"


// const socket = {};

// socket.connect = (server) => {
//   const productManager = new ProductManager();
//   //const messageManager = new MessagesManager();

//   socket.io = new Server(server);

//   let { io } = socket;

//   io.on("connection", async (socket) => {
//     console.log(`Socket ${socket.id} is online!`);

//     const products = await productManager.getProducts();
//     io.emit("products", products);

//     // socket.on("add-message", async (message) => {
//     //   await messageManager.saveMessage(message);
//     // });

//     // socket.on("user-auth", async (user) => {
//     //   if (user) {
//     //     socket.broadcast.emit("user-connected", user);
//     //   }
//     // });
//   });
// };
// export	default socket;