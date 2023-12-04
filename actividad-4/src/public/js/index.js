const socket = io()

socket.emit("message", "User disconnect")

socket.on('initialProducts', (products) => {
    renderProducts(products)
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
                       Stock: ${prod.stock}`

        listItem.textContent = textContent

        productList.appendChild(listItem)
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
const updateList = document.getElementById('updateList')

socket.on('products', (products)=>{
    console.log(JSON.stringify(products))
    let infoProducts = ''
    updateList.innerHTML = `<ul>`
    products.forEach(p=>{
        console.log(JSON.stringify(p))
        infoProducts += `<li>
        <strong>Titulo: </strong>${p.title}<br>
        <strong>Price: </strong>${p.price}<br>
        <strong>Description: </strong>${p.description}<br>
        <strong>Category: </strong>${p.category}<br>
        </li>`
    })
    infoProducts += `</ul>`
    updateList.innerHTML = infoProducts
    console.log(updateList)
    clearForm()
})

function cleanForm(){
    price.value = ''
    title.value = ''
    code.value = ''
    description.value = ''
    category.value= ''
    stock.value = ''
}


