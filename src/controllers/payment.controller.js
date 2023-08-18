
import {paymentService,userService,cartService} from '../dao/services/index.js'

export const createPaymentIntent = async (req, res) => {
  try {
    const { jwtCookie: token } = req.cookies
    const { cart, email } = await userService.decodeUser(token)

    const { products } = await cartService.getCartsbyId(cart)

    if (!products) {
      return res.status(404).send({
        status: 'error',
        error: 'Failed to get products, cart is empty'
      })
    }

    const paymentIntent = await paymentService.createPaymentIntent(
      products,
      email
    )
   
    if (!paymentIntent) {
      return res
        .status(404)
        .send({ status: 'error', error: 'Failed to create payment intent' })
    }

    return res
      .status(200)
      .send({ status: 'success', clientSecret: paymentIntent.client_secret })
  } catch (error) {

    req.logger.error(`Failed to create payment intent: ${error}`)
    return res
      .status(500)
      .send({ status: 'error', error: 'Failed to create payment intent' })
  }
}
