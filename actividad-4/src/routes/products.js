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

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()
    const limit = req.query.limit
  
    if (!limit || limit > products.length || limit <= 0) {
      res.json({ products: products })
    } else {
      res.json({ products: products.slice(0, limit) })
    }
  })
  
  router.get('/:pid', async (req, res) => {
    const productId = req.params.pid
    const product = await productManager.getProductsById(productId)
  
    if (!product) {
      res.json({ error: 'producto no encontrado' })
    } else {
      res.json({ product: product })
    }
  })

  router.post('/realTimeProducts', async (req,res) =>{
    const prod = req.body
    await productManager.addProducts(prod)
    const products = productManager.getProducts()
    socketServer.emit('newProducts', products)
  })
  
  router.post('/', async (req, res) => {
      const prod = req.body
      const products = await productManager.addProducts(prod)
      res.json(products)
  })
  
  router.put('/:pid', async (req, res) => {
      const productId = req.params.pid
      const prod = req.body
      const products = await productManager.updateProducts(productId, prod)
      res.send({ 
          status: 'success',
          products: products
       })
  })
  
  router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid
    const products = await productManager.deleteProducts(productId)
    res.json(products)
  })

export {router as productsRouter} 