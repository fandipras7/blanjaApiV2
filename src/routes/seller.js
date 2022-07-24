const express = require('express')
const { sellerRegister, sellerLogin, refreshToken, searchSeller, deleteSeller, profileSeller, updateStore } = require('../controller/seller')
const { protect, isSeller } = require('../middleware/auth')
const router = express.Router()
const upload = require('../middleware/upload')

router
  .post('/register', sellerRegister)
  .post('/login', sellerLogin)
  .post('/refresh-token', refreshToken)
  .get('/profile', protect, profileSeller)
  .get('/', /* protect,  isAdmin, */ searchSeller)
  .put('/profile', protect, isSeller, upload, updateStore)
  .delete('/:id', /* protect, isAdmin, */ deleteSeller)

module.exports = router
