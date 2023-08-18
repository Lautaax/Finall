import Stripe from 'stripe'

import config from '../../config.js'

const {
    stripeSecret
} = config

export default class PaymentService {
  constructor () {
    this.stripe = new Stripe("sk_test_51Na5WnB3q7njnQ2YsNazkmj1mGTnsudXtsUTiItZnAT7t3T2Ub1Jyh9z7NaGNYbuRlvqNd2uIBEwqJwGSUafUxFz00A7zcqWz4")
  }

 createPaymentIntent=async (data)=>{
    const paymentIntent = await this.stripe.paymentIntents.create(data);
    return paymentIntent;
 }
  calculateOrderAmount = (products) => {
    let total = 0
    products.forEach((prod) => {
      const { productId, quantity } = prod
      const { price } = productId
      total += price * quantity
    })
    return total * 100
  }

  createPaymentIntent = async (products, email) => {
    const orderDetails = JSON.stringify(
      products.reduce((acc, item) => {
        acc[item.productId.title] = item.quantity
        return acc
      }, {}),
      null,
    )

    const paymentIntentInfo = {
      amount: this.calculateOrderAmount(products),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      },
      metadata: {
        user: email,
        orderDetails
      }
    }

    const paymentIntent = await this.stripe.paymentIntents.create(
      paymentIntentInfo
    )
    return paymentIntent
  }
}
