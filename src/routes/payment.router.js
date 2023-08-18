
import { Router } from 'express'

import { createPaymentIntent } from '../controllers/payment.controller.js'

const router = Router()
router.get(
  '/create-payment-intent',
  
  createPaymentIntent
)

export default router
