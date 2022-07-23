const createError = require('http-errors')
const multer = require('multer')
const path = require('path')
// const checkImage = (req, res, next) => {
//   // console.log(req.file)
//   next()
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './imgUpload')
//     // cb(null, path.join(__dirname, './imagesUpload'))
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
//   }

// })

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 2 * 1024 * 1024
//   },
//   fileFilter: (req, file, cb) => {
//     // console.log(file.fi)
//     const filetypes = /jpg|png|jpeg/
//     // console.log(filetypes)
//     const extname = filetypes.test(file.originalname)
//     // console.log(extname)
//     const mimetype = filetypes.test(file.mimetype)
//     // console.log(file.mimetype)

//     if (mimetype && extname) {
//       return cb(null, true)
//     } else {
//       cb(createError('data harus jpg atau png'))
//     }
//   }

// })

const multerUpload = multer({
  storage: multer.diskStorage(
    {
    // destination: (req, file, cb) => {
    //   cb(null, './imgUpload')
    // },
    // filename: (req, file, cb) => {
    //   // console.log(file.originalname);
    //   const extension = path.extname(file.originalname)
    //   const filename = `${Date.now()}${extension}`
    //   cb(null, filename)
    // }
    }
  ),
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname)
    const fileSize = parseInt(req.header['content-length'])
    const maxSize = 2 * 1024 * 1024
    if (fileSize > maxSize) {
      const error = {
        message: 'FIle size exceeds 2 MB'
      }
      return cb(error, false)
    }

    if (extension === '.jpg' || extension === '.png') {
      cb(null, true)
    } else {
      const error = {
        message: 'file must be jpg or png'
      }
      cb(error, false)
    }
  }
})

const upload = (req, res, next) => {
  // const multerSingle = multerUpload.array('photo', 5)
  const multerSingle = multerUpload.single('photo')
  multerSingle(req, res, (err) => {
    if (!err) {
      next()
    } else {
      next(createError(err.message))
    }
  })
}

module.exports = upload
