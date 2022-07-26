const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
const upload = require('../middleware/upload')
const { protect, /* isAdmin */ isSeller } = require('../middleware/auth')
// const { hitCacheProductDetail, clearCacheProductDetail } = require('../middleware/redis')

router.get('/', /* protect , */ productController.getDataProduct)
router.get('/myproduct', protect, productController.getMyProduct)
router.get('/:idProduct', /* protect,  hitCacheProductDetail, */ productController.getData)
router.post('/', protect, /* isAdmin */ isSeller, upload, productController.addData)
router.put('/:id', /* protect */ upload, productController.updateData)
router.delete('/:idProduct', /* protect, clearCacheProductDetail, */ productController.deleteData)

module.exports = router
