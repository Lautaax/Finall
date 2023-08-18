const socket = io();
Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Alerta basica con Sweetalert2",
    inputValidator: (value) => {
      return !value && "Necesitas escribir un nombre de usuario para continuar";
    },
    allowOutsideClick: false,
  })
  .then((result) => {
    user = result.value;
    socket.emit("user-autenticated", user);
  });
const list = document.getElementById("listproducts")
const imagelist = document.getElementById("imageproducts")
socket.on("products", (products) => {
    // productList.innerHTML+=products // let showProducts = ""
 
       let listProducts = "";
    products.forEach((prod) => {
     
        listProducts += `<br>`+`-`+`The product ${prod.title} with the code ${prod.code} with a description ${prod.description} and the price of that product is ${prod.price}`;
    });
    list.innerHTML = `${listProducts}`

    products.thumbnails.forEach((imag)=>{
        const imgElem=document.createElement("img");
        console.log(imag)
        imgElem.src = imag;
        imgElem.alt = products.title
        imagelist.appendChild(imgElem);
    })
 
});

