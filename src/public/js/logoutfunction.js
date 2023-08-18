export const Logoutfunction=(logout)=>{
    logout.addEventListener("click",(e)=>{
        fetch(`/api/sessions/logout`, {
          method: "GET",
        }) .then(() => {
          Swal.fire({
            title: "Logout successful!",
            text: `Redirecting you to the login`,
            allowOutsideClick: false,
      
            icon: "success",
            timer: 3000,
            //timerProgressBar: true,
            willClose: () => {
              window.location.href = "/";
            }
            
          });
        })
        .catch((error) => console.log(error));
      
      })
}