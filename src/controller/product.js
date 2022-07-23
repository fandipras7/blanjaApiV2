const createError = require('http-errors')
const modelProducts = require('../models/product')
const { response } = require('../helper/common')
const modelsProduct = require('../models/product')
const errorMessage = new createError.InternalServerError()
// const client = require('../config/redis')

const productsController = {
  getData: async (req, res, next) => {
    console.log('apakah ini jalan3')
    const id = req.params.idProduct
    console.log(id)
    try {
      if (!id) {
        const query = req.query
        let queryResult
        const key = req.query.search
        const sortby = req.query.sortby
        const sort = req.query.sort
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const offset = (page - 1) * limit
        let result = await modelProducts.select(limit, offset)

        // console.log(query)
        for (const keyObject in query) {
          if (keyObject === 'search') {
            queryResult = await modelsProduct.search(key, limit, offset)
            result = queryResult.rows
          } else if (keyObject === 'sort' || keyObject === 'sortby') {
            queryResult = await modelsProduct.sort(sortby, sort, limit, offset)
            result = queryResult.rows
          }
        }

        // pagination
        const { rows: [count] } = await modelsProduct.countProduct()
        // const hasiltest = await modelsProduct.countProduct()
        // console.log(hasiltest)
        const totalData = parseInt(count.total)
        const totalPage = Math.ceil(totalData / limit)

        const pagination = {
          currentPage: page,
          limit,
          totalData,
          totalPage
        }

        return response(res, result, 200, 'Data dari database berhasil didaptakan', pagination)
      }

      console.log('apakah ini jalan')

      const { rows: [product] } = await modelProducts.selectById(id)
      console.log(product)
      // client.setEx(`produk/${id}`, 60 * 60, JSON.stringify(product))
      response(res, product, 200, 'Berhasil mengambil data dari database')
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },
  addData: (req, res, next) => {
    // const type = req.file.originalname
    // const sizePhoto = req.file.size
    console.log('apakah ini jalan')
    // req.file
    const photo = `http://${req.get('host')}/img/${req.file.filename}` || null
    const { name, brand, size, color, condition, stock, price, idCategory, description } = req.body
    console.log(name)
    const data = {
      name,
      brand: brand || '',
      size: size || '',
      color: color || '',
      photo,
      description: description || '',
      condition,
      stock,
      price,
      idCategory: idCategory || 2
    }

    // if (type.includes('.jpg') || type.includes('.png')) {
    //   photo = req.file.filename
    // } else {
    //   return response(res, null, 400, 'file harus jpg atau png')
    // }

    // if (sizePhoto > 2000000) {
    //   return next(createError('Maksimal size 2mb'))
    // }

    modelProducts.insert(data)
      .then(() => {
        response(res, data, 201, 'Produk berhasil ditambahkan')
      })
      .catch((error) => {
        console.log(error)
        next(errorMessage)
      })
  },
  updateData: async (req, res, next) => {
    try {
      const id = req.params.id
      const photo = `http://${req.get('host')}/img/${req.file.filename}` || null
      const { name, brand, size, color, condition, description, stock, price, idCategory } = req.body
      console.log(req.body)
      const data = {
        name,
        brand: brand || '',
        size: size || '',
        color: color || '',
        condition: condition || '',
        description: description || '',
        stock,
        price,
        photo,
        idCategory: idCategory || 3,
        id
      }
      console.log(data);
      const result = await modelProducts.update(data)
      if (result.rowCount) {
        response(res, data, 201, 'Data berhasil di update')
      } else {
        next(new Error('Id tidak ditemukan'))
      }
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },
  deleteData: (req, res, next) => {
    const id = req.params.idProduct
    modelProducts.delete(id)
      .then(() => {
        response(res, null, 200, 'Data berhasil di hapus')
      })
      .catch(() => {
        next(errorMessage)
      })
  }
  // searchProduct: (req, res, next) => {
  //   const key = req.query.search
  //   modelProducts.
  // }
}

module.exports = productsController
