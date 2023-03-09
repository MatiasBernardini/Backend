const socket = io()

const updatedProductList = document.getElementById("updatedProductList")

socket.on("added-Product", (data)=>{
    updatedProductList.innerHTML += 
        `
            <ul>
                <li>
                    <p>Title: ${data.title}</p>
                    <p>Price: $ ${data.price}</p>
                    <p>Description: ${data.description}</p>
                    <p>Stock: ${data.stock}</p>
                </li>
            </ul>
        `
})

socket.on("delete-Product", (product)=>{
    updatedProductList.innerHTML = ""
    product.forEach( prod => {
        updatedProductList.innerHTML += 
            `
            <ul>
                <li>
                    <p>Title: ${prod.title} </p>
                    <p>Price: $ ${prod.price}</p>
                    <p>Description: ${prod.description}</p>
                    <p>Stock: ${prod.stock}</p>
                </li>
            </ul>
            `
    }) 
})

socket.on("update-Product", (product)=>{
    updatedProductList.innerHTML = ""
    product.forEach( prod => {
        updatedProductList.innerHTML += 
            `
            <ul>
                <li>
                    <p>Title: ${prod.title} </p>
                    <p>Price: $ ${prod.price}</p>
                    <p>Description: ${prod.description}</p>
                    <p>Stock: ${prod.stock}</p>
                </li>
            </ul>
            `
    }) 
})