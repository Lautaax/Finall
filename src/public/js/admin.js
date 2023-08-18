import { Logoutfunction } from "./logoutfunction.js"
const d = document

const deleteUserButtons = d.querySelectorAll('[id^="deleteUser-"]')
const changeuserButtons = d.querySelectorAll('[id^="changeRole-"]')
const deleteInactiveUsers = d.getElementById('deleteInactiveUsers')
const logout=d.getElementById("logout")
deleteUserButtons.forEach((button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault()

    const cartId = button.getAttribute('id').split('-')[1]
    const userName = button.querySelector('h3').textContent


    try {
      const response = await fetch(`/api/users/${cartId}`, {
        method: 'DELETE'
      })
      const data = await response.json()

      if (response.ok) {
        Swal.fire({
          title: 'User successfully deleted!',
          text: `User name ${userName}`,
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
})
changeuserButtons.forEach((button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault()
    const userId = button.getAttribute('id').split('-')[1]
    try {
      const response = await fetch(`/api/users/premium/${userId}`, {
        method: 'PUT'
      })
      const data = await response.json()

      if (response.ok) {
        Swal.fire({
          title: 'User successfully changed role!',
          text: `User name `,
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
})
deleteInactiveUsers.addEventListener('click', async (e) => {
  e.preventDefault()
  try {
    const response = await fetch('/api/users/inactive', {
      method: 'DELETE'
    })
    const data = await response.json()

    if (response.ok) {
      Swal.fire({
        title: 'Inactive users deleted!',
        html: 'Removed users for inactivity',
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
    console.log(error)
  }
})
Logoutfunction(logout)