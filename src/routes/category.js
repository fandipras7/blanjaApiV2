const express = require('express')
const routerCategory = express.Router()
const categoryController = require('../controller/category')
const { protect, isAdmin } = require('../middleware/auth')

routerCategory.get('/', /* protect, */ categoryController.getData)
routerCategory.post('/', /* protect,  isAdmin, */ categoryController.addData)
routerCategory.put('/:idCategory', protect, isAdmin, categoryController.updateData)
routerCategory.delete('/:id', /* protect, isAdmin, */categoryController.deleteData)

module.exports = routerCategory
