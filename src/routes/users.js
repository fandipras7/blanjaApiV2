const express = require('express')
const router = express.Router()
const { register, login, profile, refreshToken, activation, deleteUser, searchUser } = require('../controller/users')
const { protect, isAdmin } = require('../middleware/auth')

router
  .post('/register', register)
  .post('/login', login)
  .post('/refresh-token', refreshToken)
  .get('/', /* protect,  isAdmin, */ searchUser)
  .get('/profile', protect, profile)
  .get('/active/:token', protect, activation)
  .delete('/:id', /* protect, isAdmin, */ deleteUser)

module.exports = router
