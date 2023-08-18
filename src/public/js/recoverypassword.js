const form = document.getElementById("recoverpassword")

form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => (obj[key] = value));

    let response = await fetch("/recovery/resetpassword",{
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
    }).catch((error)=> console.log(error))
    if(response === "link expiro"){
      window.location.href="/formemailrecovery"
    }
    if(!response){
      Swal.fire({
        title: "Password changed",
        toast: true,
        position: "top-right",
        icon: "success",
      }).then(function() {
        window.location = "/";
    });;
    }else{
      Swal.fire({
        title: "Password not changed",
        toast: true,
        position: "top-right",
        icon: "error",
      });
    }
})