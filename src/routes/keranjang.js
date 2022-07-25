const express = require('express')
const cartController = require('../controller/cart')
const { protect } = require('../middleware/auth')
const router = express.Router()

router
  .post('/', protect, cartController.addCart)
  .get('/', protect, cartController.getCart)
  .delete('/:id', protect, cartController.deleteCart)

module.exports = router
