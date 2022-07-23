const createError = require('http-errors')
const { response } = require('../helper/common')
const categoryModels = require('../models/category')
const errorMessage = new createError.InternalServerError()

const categoryController = {
  getData: (req, res, next) => {
    categoryModels.selectCategory()
      .then((result) => {
        // res.json({
        //   data: result
        // })
        response(res, result, 200, 'Berhasil mendapatkan produk')
      })
      .catch((error) => {
        console.log(error)
        next(errorMessage)
      })
  },
  addData: (req, res, next) => {
    const { name } = req.body
    const data = name
    console.log(data)
    categoryModels.insertCategory(data)
      .then(() => {
        // console.log(result);
        response(res, data, 201, 'Berhasil menambahkan produk')
      })
      .catch((error) => {
        console.log(error)
        next(errorMessage)
      })
  },
  updateData: (req, res, next) => {
    const id = req.params.idCategory
    const { name } = req.body
    const data = {
      id,
      name
    }
    categoryModels.updateCategory(data)
      .then((result) => {
        console.log(result)
        if (result.rowCount) {
          response(res, data, 200, 'Category berhasil di update')
        } else {
          next(new Error('id tidak ditemukan tidak ada data yang dihapus'))
        }
      })
      .catch((error) => {
        console.log(error)
        next(errorMessage)
      })
  },
  deleteData: (req, res, next) => {
    const id = req.params.id
    // console.log(id)
    categoryModels.deleteCategory(id)
      .then((result) => {
        if (result.rowCount) {
          response(res, null, 200, `produk dengan id ${id} berhasil di hapus`)
        } else {
          next(new Error('id tidak ditemukan tidak ada data yang dihapus'))
        }
      })
      .catch(() => {
        next(errorMessage)
      })
  }
}
module.exports = categoryController
