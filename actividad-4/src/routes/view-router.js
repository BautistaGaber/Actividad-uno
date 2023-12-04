import { Router } from "express"
import ProductManager from "../managers/ProductManager.js"
import socketServer from "../app.js"

const productManager = new ProductManager('./src/files/products.json')

const router = Router()

router.get("/home", async (req,res) =>{
    const products = await productManager.getProducts()
    res.render('home', {})
})

router.get("/realTimeProducts", async (req,res) =>{
    res.render('realTimeProducts')
})

router.post('/realTimeProducts', async (req,res) =>{
    console.log("entro")
    const prod = req.body
    console.log(prod)
    await productManager.addProducts(prod)
    const products = await productManager.getProducts()
    socketServer.emit('products', products)
  })

export {router as viewRouter} 