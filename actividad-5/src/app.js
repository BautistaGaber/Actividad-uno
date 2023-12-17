import express from "express";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { productsRouter } from "./routes/products.js";
import { viewRouter } from "./routes/view-router.js";
import { cartsRouter } from "./routes/carts.js";
import productModel from "./dao/mongodb/models/product.model.js";
import mongoose from "mongoose";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views", viewRouter);

const MONGO =
  "mongodb+srv://bautistagaber:UZ7N4k7m88BIAs2L@cluster0.hdnj5k1.mongodb.net/ecommerce";

const connection = mongoose.connect(MONGO);

const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`)
);

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
  console.log("new connection");

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });

  socket.emit("initialProducts", await productModel.find());

  socket.on("newProduct", async (newProd) => {
    await productModel.create(newProd);
    const updatedProducts = await productModel.find();
    socket.emit("updateProducts", updatedProducts);
  });

  socket.on("deleteProduct", async (idToDelete) => {
    console.log(idToDelete);
    if (idToDelete) {
      await productModel.findByIdAndDelete(idToDelete);
      const updatedProducts = await productModel.find();
      socketServer.emit("updateProducts", updatedProducts);
    } else {
      console.error("no hay id valido");
    }
  });
});

export default socketServer;
