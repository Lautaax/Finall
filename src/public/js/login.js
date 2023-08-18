const form = document.getElementById("login");
const inputEmail=document.getElementById("email");
const inputPass=document.getElementById("password");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }) 


  if(response.ok){
    Swal.fire({
      title: 'You have logued successfully!',
      text: `Welcome!`,
      allowOutsideClick: false,
      icon: 'success',

      timer: 2000,
      timerProgressBar: true,
      willClose: () => {
        window.location.href = '/products'
      }
    })

  }else{
    Swal.fire({
      title: "Password incorrect",
      toast: true,
      position: "top-right",
      icon: "error",
    });
  }
});