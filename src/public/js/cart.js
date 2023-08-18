import { Logoutfunction } from "./logoutfunction.js"
const removeFromCartForms = document.querySelectorAll(
  '[id^="removeFromCartForm-"]'
)
let logout = document.getElementById('logout')
const cartId = document.getElementById('cartId').textContent
const checkoutBtnbought = document.getElementById('checkoutBtn')
let stripe
let elements
let emailAddress = ''

const appearance = {
  theme: 'flat',
};
async function initializeProcesstobuy() {
  const response = await fetch('/api/payments/create-payment-intent')
  const { clientSecret } = await response.json()

  elements = stripe.elements({ appearance, clientSecret, locale: 'en' })
  
  

  
  const linkAuthentication = elements.create('linkAuthentication')
  linkAuthentication.mount('#link-authentication-elements')

  linkAuthentication.on('change', (event) => {
    emailAddress = event.value.email
  })

  const paymentOptions = {
    layout: 'tabs'
  }

  const paymentElement = elements.create('payment', paymentOptions)
  paymentElement.mount('#payment-element')
}

function showMessage(message) {
  const messageContainer = document.querySelector('#payment-message')

  messageContainer.classList.remove('hidden')
  messageContainer.textContent = message

  setTimeout(function () {
    messageContainer.classList.add('hidden')
    messageContainer.textContent = ''
  }, 5000)
}


if (checkoutBtnbought) {
  initializeProcesstobuy()
  stripe = Stripe(
    'pk_test_51Na5WnB3q7njnQ2Y2AVfxKKKsvlo34plywjSA0b7Lq2tmz728QZ1mBNLtLzbcEhd55reG7G839q5QCF6a859jghd00J5CGRGRf'
  )
}



removeFromCartForms.forEach((form) => {
  form.addEventListener('submit', async (e) => {

    e.preventDefault()
    const productId = form.getAttribute('id').split('-')[1]
    try {
      const response = await fetch(
        `/api/carts/${cartId}/product/${productId}`,
        { method: 'DELETE' }
      )
      const data = await response.json()

      if (response.ok) {
        Swal.fire({
          title: "Product removed from cart!",
          text: `You removed this product from the cart`,
          footer: "Reloading page in 4s",
          toast: true,
          position: "top-right",
          icon: "success",

        });
        setTimeout(() => {
          location.reload();
        }, 4000);
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

checkoutBtn?.addEventListener('click', async (e) => {
  e.preventDefault()

  try {
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        receipt_email: emailAddress
      }
    })

    if (error?.type === 'card_error' || error?.type === 'validation_error') {
      showMessage(error.message)
    }

    if (paymentIntent.status === 'succeeded') {
      Swal.fire({
        title: 'Successful Bought!',
        text: `Congrats!`,
        allowOutsideClick: false,
        icon: 'success',
  
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          window.location.href = `/cart/${cartId}/purchase`
        }
      })


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