const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  let response = await fetch("/api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    Swal.fire({
      title: "User registered",
      toast: true,
      position: "top-right",
      icon: "success",
      
    });
  })
  .catch((error) => console.log(error));


});