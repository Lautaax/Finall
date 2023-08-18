const form = document.getElementById("recoveryform")

form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => (obj[key] = value));


    let response = await fetch("/recovery/mail",{
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
    }).catch((error)=> console.log(error))
    if(response.ok){
      Swal.fire({
        title: "A link was send to your email",
        toast: true,
        position: "top-right",
        icon: "error",
      });
    }else{
      Swal.fire({
        title: "Password incorrect",
        toast: true,
        position: "top-right",
        icon: "error",
      });
    }
})