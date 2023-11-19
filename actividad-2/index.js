import ProductManager from './manager/ProductManager.js'

const productManager = new ProductManager('files/products.json')

const env = async () => {
  const consulta = await productManager.getProducts()
  console.log(consulta)
  let product = {
    title: 'Mesa',
    description: 'Mesa de madera',
    price: 67890,
    thumbnail: '../img2.jpg',
    code: 'prod2',
    stock: 3,
  }

  let result = await productManager.addProducts(product)
  console.log(result)

  let productId = await productManager.getProductsById(1)
  console.log(productId)

  const prodIdToUpdate = 1
  const prodToUpdate = {
    title: 'new producto 1',
    description: 'new descripcion 1',
    price: 200,
    thumbnail: 'new thumbnail 1',
    code: 2,
    stock: 5,
  }
  const resultUpdate = await productManager.updateProducts(
    prodIdToUpdate,
    prodToUpdate
  )
  console.log(resultUpdate)

  const deleteProd = await productManager.deleteProducts(1)
  console.log(`se elimino correctamente el producto con id ${prodIdToUpdate}`)

  const consultafinal = await productManager.getProducts()
  console.log(consultafinal)
}

env()
