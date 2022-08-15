const express = require('express')
const router = express.Router()
const paymentController = require('../controller/payment')
const { protect } = require('../middleware/auth')

router
  .get('/:id', protect, paymentController.checkStatus)
  .post('/pay', protect, paymentController.pay)

module.exports = router
