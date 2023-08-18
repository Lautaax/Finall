import { Logoutfunction } from "./logoutfunction.js"
const d = document

const uid = d.getElementById('userId').innerText

const addDocumentsForm = d.getElementById('addDocumentsForm')
const identification1 = d.getElementById('identification').files
const address1 = d.getElementById('address').files
const statement1 = d.getElementById('statement').files

const addProfilePictureForm = d.getElementById('addProfilePictureForm')
const updateProfilePictureForm = d.getElementById('updateProfilePictureForm')
const profilePictureInput = d.getElementById('profile')
const profilePicture = profilePictureInput.files
let logout = d.getElementById("logout")
const changeRoleForm = d.getElementById('changeRoleForm')

const checkDocumentationForm = d.getElementById('checkDocumentation')

// Documentation upload form

addDocumentsForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(addDocumentsForm)

    for (let i = 0; i < identification1.length; i++) {
        formData.append('identification', identification1[i])
    }

    for (let i = 0; i < address1.length; i++) {
        formData.append('address', address1[i])
    }

    for (let i = 0; i < statement1.length; i++) {
        formData.append('statement', statement1[i])
    }

    try {
        const response = await fetch(`/api/users/${uid}/documents`, {
            method: 'POST',
            body: formData
        })
        const data = await response.json()

        if (response.ok) {
            Swal.fire({
                title: 'Documents successfully uploaded!',
                html: `When all 3 docs are uploaded<br>
                    You can change your role to premium`,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
               
            })
        } else {
            throw data
        }
    } catch ({ error }) {
        Swal.fire({
            title: 'Error!',
            html: `<p>There is something wrong when your request</p>`,
            icon: 'error',
            timer: 5000,
            footer: 'Reloading page on close',
            timerProgressBar: true,
  
            willClose: () => {
                location.reload()
            }
        })
    }
})

// Profile picture form

profilePictureInput.addEventListener('change', () => {
    addProfilePictureForm.dispatchEvent(new Event('submit'))
})

addProfilePictureForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(addProfilePictureForm)

    for (let i = 0; i < profilePicture.length; i++) {
        formData.append('profile', profilePicture[i])
    }

    try {
        const response = await fetch(`/api/users/${uid}/profile`, {
            method: 'POST',
            body: formData
        })
        const data = await response.json()

        if (response.ok) {
            Swal.fire({
                title: 'Profile picture loaded!',
                html: 'Nice picture!',
                toast: true,
                position: 'top-right',
                icon: 'success',
                timer: 3000,
                footer: 'Reloading page on close',
                timerProgressBar: true,
           
                willClose: () => {
                  location.reload()
                }
              })
        } else {
            throw data
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
})

updateProfilePictureForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(addProfilePictureForm)

    for (let i = 0; i < profilePicture.length; i++) {
        formData.append('profile', profilePicture[i])
    }

    try {
        const response = await fetch(`/api/users/${uid}/profilechanges`, {
            method: 'PUT',
            body: formData
        })
        const data = await response.json()

        if (response.ok) {
            Swal.fire({
                title: 'Profile picture updated!',
                html: '<p>Updated profile</p>',
                toast: true,
                position: 'top-right',
                icon: 'success',
                timer: 3000,
                footer: 'Reloading page on close',
                timerProgressBar: true,

                willClose: () => {
                    location.reload()
                }
            })
        } else {
            throw data
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
})
// Role change form

changeRoleForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(`/api/users/premium/${uid}`, {
            method: 'POST'
        })
        const data = await response.json()

        if (response.ok) {
            Swal.fire({
                title: 'Role successfully updated!',
                html: `To complete the update, we need to log you out,<br>
                      Please, login again to finish the process`,
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
          
                willClose: () => {
                  window.location.href = '/'
                }
              })
            await fetch('/api/sessions/logout')
        } else {
            throw data
        }
    } catch ({ error }) {
        Swal.fire({
            title: 'Error!',
            html: `<p>There is something wrong when your request</p>`,
            icon: 'error',
            timer: 5000,
            footer: 'Reloading page on close',
            timerProgressBar: true,
    
            willClose: () => {
                location.reload()
            }
        })
    }
})



checkDocumentationForm.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(`/api/users/${uid}/status`)
        const docs = await response.json()

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                html: `<p>Documentation accepted</p>`,
                icon: 'error',
                timer: 4000,
                footer: 'Reloading page on close',
                timerProgressBar: true,
    
                willClose: () => {
                    location.reload()
                }
            })
   
        } else {
            throw data
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
})
Logoutfunction(logout)