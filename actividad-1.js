class ProductManager {
  constructor() {
    this.products = []
  }

  getProducts() {
    return this.products
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const product = { title, description, price, thumbnail, code, stock }
    const existingProduct = this.products.find((p) => p.code === code)

    if (existingProduct) {
      console.log('Ya existe un producto con ese código')
    } else {
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Faltan datos')
      } else {
        const newProduct = { ...product, id: this.products.length + 1 }
        this.products.push(newProduct)
        console.log('Producto agregado: ', newProduct)
      }
    }

    return this.products
  }

  getProductsById(id) {
    const productById = this.products.find((p) => p.id === id)
    if (productById) {
      return productById
    } else {
      return console.log('Not found')
    }
  }
}

const productManager = new ProductManager()

productManager.addProduct(
  'producto 1',
  'descripcion 1',
  100,
  'thumbnail 1',
  1,
  10
)
productManager.addProduct(
  'producto 2',
  'descripcion 2',
  200,
  'thumbnail 2',
  2,
  20
)
productManager.addProduct(
  'producto 3',
  'descripcion 3',
  300,
  'thumbnail 3',
  3,
  30
)

const productIdToFind = 1
const foundProduct = productManager.getProductsById(productIdToFind)

if (foundProduct) {
  console.log(`Producto con ID ${productIdToFind} encontrado:`, foundProduct)
} else {
  console.log(`Producto con ID ${productIdToFind} no encontrado.`)
}


console.log('Todos los productos:', productManager.getProducts())
