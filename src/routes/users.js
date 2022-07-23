const express = require('express')
const router = express.Router()
const { register, login, profile, refreshToken, activation, deleteUser, searchUser, updateUser } = require('../controller/users')
const { protect } = require('../middleware/auth')
const upload = require('../middleware/upload')

router
  .post('/register', register)
  .post('/login', login)
  .post('/refresh-token', refreshToken)
  .put('/profile', protect, upload, updateUser)
  .get('/', /* protect,  isAdmin, */ searchUser)
  .get('/profile', protect, profile)
  .get('/active/:token', protect, activation)
  .delete('/:id', /* protect, isAdmin, */ deleteUser)

module.exports = router
