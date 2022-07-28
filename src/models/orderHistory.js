const pool = require('../config/db')

const modelOrderHistory = {
  createOrderItem: ({ orderItemId, orderDetailsId, productId, quantity }) => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line quotes
      pool.query(`INSERT INTO order_items (id, order_id, product_id, quantity) VALUES ($1, $2, $3, $4)`,
        [orderItemId, orderDetailsId, productId, quantity], (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  },

  createOrderDetails: (orderDetailsId, idUser, total, paymentId) => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line quotes
      pool.query(`INSERT INTO order_details (id, users_id, total, payment_id) VALUES 
      ($1, $2, $3, $4)`,
      [orderDetailsId, idUser, total, paymentId], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  createPayment: (paymentId, orderDetailsId, amount, provider, status, userId) => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line quotes
      pool.query(`INSERT INTO payment (id, order_id, amount, provider, status, user_id) VALUES ($1, $2, $3, $4, $5, $6)`,
        [paymentId, orderDetailsId, amount, provider, status, userId], (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(err)
          }
        })
    })
  },

  getMyPayment: (idUser) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM PAYMENT where user_id = $1', [idUser], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  getOrderDetail: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`select payment.amount AS total_harga, payment.provider, products.name AS nama_barang, products.price, order_items.quantity, users.name
        from order_items inner join products ON order_items.product_id = products.id
        INNER join order_details on order_items.order_id = order_details.id
        INNER join payment ON order_details.payment_id = payment.id
        inner join users ON order_details.users_id = users.id
        WHERE order_items.order_id = $1`, [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = modelOrderHistory
