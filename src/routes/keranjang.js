const express = require('express')
const cartController = require('../controller/cart')
const { protect } = require('../middleware/auth')
const router = express.Router()

router
  .post('/', protect, cartController.addCart)
  .get('/', protect, cartController.getCart)
  .delete('/:id', protect, cartController.deleteCart)
  .put('/add/:id', cartController.updateCart)
  .put('/decrease/:id', cartController.decreaseCart)

module.exports = router
