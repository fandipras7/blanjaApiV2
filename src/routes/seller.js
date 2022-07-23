const express = require('express')
const { sellerRegister, sellerLogin, refreshToken, searchSeller, deleteSeller, profileSeller } = require('../controller/seller')
const { protect } = require('../middleware/auth')
const router = express.Router()

router
  .post('/register', sellerRegister)
  .post('/login', sellerLogin)
  .post('/refresh-token', refreshToken)
  .get('/profile', protect, profileSeller)
  .get('/', /* protect,  isAdmin, */ searchSeller)
  .delete('/:id', /* protect, isAdmin, */ deleteSeller)

module.exports = router
