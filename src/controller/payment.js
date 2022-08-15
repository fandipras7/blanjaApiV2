const midtransClient = require('midtrans-client')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const modelOrderHistory = require('../models/orderHistory')
const errorMessage = new createError.InternalServerError()

const core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: 'SB-Mid-server-V1rmHqh19pkJIVDj_eTM3Rx_',
  clientKey: 'SB-Mid-client-zb-WMuaUIBAQAn-2'
})

// const apiClient = new midtransClient.Snap({
//   isProduction: false,
//   serverKey: 'SB-Mid-server-V1rmHqh19pkJIVDj_eTM3Rx_',
//   clientKey: 'SB-Mid-client-zb-WMuaUIBAQAn-2'
// })

const pay = async (req, res, next) => {
  try {
    const idUser = req.user.id
    const orderDetailsId = uuidv4()
    const paymentId = uuidv4()
    const { provider, amount, product } = req.body
    //   const totalPembayaran = req.body.total
    //   const bank = req.body.bank

    const dataOrderItem = product.map((item) => {
      return {
        orderItemId: uuidv4(),
        orderDetailsId,
        productId: item.id,
        quantity: item.quantity
      }
    })
    // response(res, dataOrderItem, 201, 'Transaction has been created')
    const parameter = {
      payment_type: 'bank_transfer',
      bank_transfer: {
        bank: provider
        //   permata: {
        //     recipient_name: 'SUDARSONO'
        //   }
      },
      transaction_details: {
        order_id: uuidv4(),
        gross_amount: amount
      },
      item_details: [...dataOrderItem]
    }
    const chargeResponse = await core.charge(parameter)
    dataOrderItem.map(async (item) => {
      await modelOrderHistory.createOrderItem(item)
    })
    const orderDetail = await modelOrderHistory.createOrderDetails(orderDetailsId, idUser, amount, paymentId)
    const payment = await modelOrderHistory.createPayment(paymentId, orderDetailsId, amount, provider, chargeResponse.transaction_status, idUser)
    res.json({
      data: chargeResponse
    })
    // core.charge(parameter)
    //   .then((chargeResponse) => {
    //     //   console.log('chargeResponse:')
    //     console.log(chargeResponse)
    //     res.json({
    //       data: chargeResponse
    //     })
    //   })
  } catch (error) {
    console.log(error)
    next(errorMessage)
  }
}

const checkStatus = (req, res, next) => {
  const idTransaction = req.params.id
  core.transaction.status(idTransaction)
    .then((response) => {
      // do something to `response` object
      res.json({
        data: response
      })
    })
}

module.exports = {
  pay,
  checkStatus
}
