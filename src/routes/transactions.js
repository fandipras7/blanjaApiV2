const express = require('express')
const router = express.Router()
const orderHistoryController = require('../controller/orderHistory')
const { protect } = require('../middleware/auth')

router
  .post('/', protect, orderHistoryController.createOrder)
  .get('/', protect, orderHistoryController.getPayment)
  .get('/:id', protect, orderHistoryController.getOrderDetail)

module.exports = router
