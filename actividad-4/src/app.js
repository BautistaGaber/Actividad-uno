import express from 'express'
import { engine } from "express-handlebars"
import __dirname from './utils.js'
import { Server } from 'socket.io'
import { productsRouter } from './routes/products.js'
import { viewRouter } from './routes/view-router.js'
import ProductManager from './managers/ProductManager.js'
import { cartsRouter } from './routes/carts.js'

const productManager = new ProductManager("./src/files/products.json")

const PORT = 8080
const app = express()

const httpServer = app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

const socketServer = new Server(httpServer)

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/views", viewRouter)

socketServer.on("connection",async (socket) => {
    console.log("new connection")

    socket.on("disconnect", ()=>{
        console.log("user disconnect")
    })
    const products = await productManager.getProducts()
    socket.emit('initialProducts', products)
})

export default socketServer


