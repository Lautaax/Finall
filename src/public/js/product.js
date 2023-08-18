import { Logoutfunction } from "./logoutfunction.js";
const logout = document.getElementById("logout")
const formButton = document.getElementById('botonForm');
let cId = document.getElementById("cid").value;

let pId = document.getElementById('pid').value;
let stock = document.getElementById('stock').value;
// addToCart.forEach((form) => {
const home = document.getElementById("home");
formButton.addEventListener("click", async (e) => {
  e.preventDefault();




  const title = document.getElementById("title")

  try {
    let response = fetch(`/api/carts/${cId}/product/${pId}`, {
      method: "POST",
    })
    const data = await response.json()
    if (parseInt(stock) >= 1) {
      if (response.ok) {
        Swal.fire({
          title: "Product added to cart!",
          text: `You added 1 unit of the product ${title.innerHTML}`,
          toast: true,
          position: "top-right",
          icon: "success",

        });
      } else {
        throw data
      }
    }else{
      throw { error: 'Product is out of stock, sorry' }
    }

  } catch ({ error }) {
    Swal.fire({
      title: 'Error!',
      html: `<p>There is something wrong when your request</p>`,
      icon: 'error',
      timer: 4000,
      footer: 'Reloading page on close',
      timerProgressBar: true,
      willClose: () => {
        location.reload()
      }
    })
  }



});


home.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/products";
})
logout.addEventListener("click", (e) => {
  fetch(`/api/sessions/logout`, {
    method: "GET",
  }).then(() => {
    Swal.fire({
      title: "Logout successful!",
      text: `Redirecting you to the login`,
      allowOutsideClick: false,
      confirmButton: false,
      icon: "success",
      timer: 3000,


      willClose: () => {
        window.location.href = "/";
      }

    });
  })
    .catch((error) => console.log(error));

})
Logoutfunction(logout)
// });
