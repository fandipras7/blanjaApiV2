require('dotenv').config()
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: 'dbpfwb5ok',
  api_key: '117781545328253',
  api_secret: '1nAdMge0mf1KjuDwJi8CWPWpHx8'
})

module.exports = cloudinary
