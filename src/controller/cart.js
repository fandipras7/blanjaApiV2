const createError = require('http-errors')
const { response } = require('../helper/common')
const errorMessage = new createError.InternalServerError()
const { v4: uuidv4 } = require('uuid')
const cartModel = require('../models/cart')

const cartController = {
  addCart: async (req, res, next) => {
    try {
      const id = uuidv4()
      const userId = req.user.id
      const { productId, qty } = req.body

      const data = {
        id,
        userId,
        productId,
        qty
      }

      const checkId = await cartModel.checkProductId(data.productId)
      //   console.log(checkId.rowCount)
      if (checkId.rowCount) {
        const cart = checkId.rows[0]
        const qty = cart.qty + 1
        await cartModel.updateCartStock(cart.id, qty)
        return response(res, { ...cart, qty }, 200, 'ADD CART SUCCESS')
      }

      await cartModel.createCart(data)

      response(res, data, 200, 'ADD CART SUCCESS')
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },

  getCart: async (req, res, next) => {
    try {
      const id = req.user.id
      const result = await cartModel.getCart(id)

      response(res, result.rows, 200, 'GET MY CART SUCCESS')
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },

  deleteCart: async (req, res, next) => {
    try {
      const id = req.params.id
      console.log(id)
      await cartModel.deleteCart(id)
      response(res, null, 200, 'DELETE DATA SUCCESS')
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  }
}

module.exports = cartController
