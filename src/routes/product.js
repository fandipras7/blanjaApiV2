const express = require('express')
const router = express.Router()
const productController = require('../controller/product')
const { upload } = require('../middleware/upload')
const { protect, /* isAdmin */ isSeller } = require('../middleware/auth')
// const { hitCacheProductDetail, clearCacheProductDetail } = require('../middleware/redis')

router.get('/', /* protect , */ productController.getData)
router.get('/:idProduct', /* protect,  hitCacheProductDetail, */ productController.getData)
router.post('/', protect, /* isAdmin */ isSeller, upload.single('photo'), productController.addData)
router.put('/:id', /* protect */ upload.single('photo'), productController.updateData)
router.delete('/:idProduct', /* protect, clearCacheProductDetail, */ productController.deleteData)

module.exports = router
