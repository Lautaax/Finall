const addProductForm = document.getElementById("addProductForm");

const thumbnails = document.getElementById("thumbnails").files;

addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(addProductForm);
    for (let i = 0; i < thumbnails.length; i++) {
        formData.append("thumbnails", thumbnails[i]);
    }

    let response = await fetch(`/api/products`, {
        method: "POST",
        body: formData,
    }).catch((error) => console.log(error));
    if (!response) {
        Swal.fire({
            title: "Product successfully created",
            toast: true,
            position: "top-right",
            icon: "success",

        });
    }else{
        Swal.fire({
            title: "The product cannot be created",
            toast: true,
            position: "top-right",
            icon: "error",
        });
    }
});
