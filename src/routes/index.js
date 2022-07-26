const express = require('express')
const router = express.Router()
const categoryRoute = require('./category')
const productRoute = require('./product')
const userRoute = require('./users')
// const orderRoute = require('./order_details')
const sellerRoute = require('./seller')
const cartRoute = require('./keranjang')
const transactionRoute = require('./transactions')
const paymentRoute = require('./payment')

router
  .use('/category', categoryRoute)
  .use('/products', productRoute)
  .use('/users', userRoute)
  .use('/seller', sellerRoute)
  .use('/transaction', transactionRoute)
  .use('/cart', cartRoute)
  .use('/payment', paymentRoute)

module.exports = router
