import { Logoutfunction } from "./logoutfunction.js";
const addToCartForms = document.querySelectorAll('[id^="addToCartForm-"]');
let cId=document.getElementById("cid").value
let stock = document.getElementById('stock').value;
let logout=document.getElementById("logout")
addToCartForms.forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();


    
    const productId = form.getAttribute("id").split("-")[1];

    const prodTitle = form.closest("div").querySelector("h5").textContent;

    try {
      let response = fetch(`/api/carts/${cId}/product/${productId}`, {
        method: "POST",
      })
      const data = await response.json()
      if (parseInt(stock) >= 1) {
        if (response.ok) {
          Swal.fire({
            title: "Product added to cart!",
            text: `You added 1 unit of the product ${prodTitle.innerHTML}`,
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
});
Logoutfunction(logout)