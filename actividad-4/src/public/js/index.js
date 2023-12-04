const socket = io()

socket.emit("message", "User disconnect")

socket.on('initialProducts', (products) => {
    renderProducts(products)
})

socket.on('newProducts', (updatedProducts) => {
    renderProducts(updatedProducts);
})

function renderProducts(products) {
    const productList = document.getElementById('productList')
    productList.innerHTML = ""

    products.forEach((prod) => {
        const listItem = document.createElement("li")
        const textContent = `Title: ${prod.title},
                       Description: ${prod.description},
                       Price: $${prod.price},
                       Thumbnail: ${prod.thumbnail},
                       Code: ${prod.code},
                       Stock: ${prod.stock}`;

        listItem.textContent = textContent;

        productList.appendChild(listItem);
    })
} 

const form = document.getElementById('form')
const title = document.getElementById('title')
const description = document.getElementById('description')
const price = document.getElementById('price')
const category = document.getElementById('category')
const thumbnail = document.getElementById('thumbnail')
const code = document.getElementById('code')
const stock = document.getElementById('stock')

form.onsubmit = (send) => {
    send.preventDefault();
    const newProduct = {
        title: title.value,
        description: description.value,
        price: price.value,
        category: category.value,
        code: code.value,
        stock: stock.value
    }
    socket.emit('newProduct', newProduct);
}
