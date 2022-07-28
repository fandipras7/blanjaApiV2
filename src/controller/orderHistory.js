const createError = require('http-errors')
const errorMessage = new createError.InternalServerError()
const { v4: uuidv4 } = require('uuid')
const modelOrderHistory = require('../models/orderHistory')
const { response } = require('../helper/common')

const orderHistoryController = {
  createOrder: async (req, res, next) => {
    try {
      const idUser = req.user.id
      //   const orderItemId = uuidv4()
      const orderDetailsId = uuidv4()
      const paymentId = uuidv4()
      const status = 'Belum Bayar'
      const { provider, amount, product } = req.body
      console.log(req.body)

      const dataOrderItem = product.map((item) => {
        return {
          orderItemId: uuidv4(),
          orderDetailsId,
          productId: item.id,
          quantity: item.quantity
        }
      })

      //   console.log(dataOrderItem)
      dataOrderItem.map(async (item) => {
        await modelOrderHistory.createOrderItem(item)
      })
      console.log(dataOrderItem)
      const orderDetail = await modelOrderHistory.createOrderDetails(orderDetailsId, idUser, amount, paymentId)
      const payment = await modelOrderHistory.createPayment(paymentId, orderDetailsId, amount, provider, status, idUser)
      console.log(orderDetail)
      response(res, dataOrderItem, 201, 'Transaction has been created')
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },

  getPayment: async (req, res, next) => {
    try {
      const iduser = req.user.id
      const result = await modelOrderHistory.getMyPayment(iduser)
      console.log('saajflhf')
      response(res, result.rows, 201, 'Get Payment Success')
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  },

  getOrderDetail: async (req, res, next) => {
    try {
      const id = req.params.id
      console.log(id)
      const result = await modelOrderHistory.getOrderDetail(id)
      response(res, result.rows, 200, 'GET Order Detail Success')
    } catch (error) {
      console.log(error)
      next(errorMessage)
    }
  }
}

module.exports = orderHistoryController
