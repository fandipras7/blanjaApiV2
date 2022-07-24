const pool = require('../config/db')

const cartModel = {
  createCart: ({ id, userId, productId, qty }) => {
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO cart(id, user_id, product_id, qty)VALUES($1, $2, $3, $4)', [id, userId, productId, qty], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  getCart: (id) => {
    // eslint-disable-next-line no-new
    return new Promise((resolve, reject) => {
      pool.query(`SELECT cart.id AS cart_id, cart.user_id, cart.product_id, cart.id,
        products.name, products.photo FROM cart INNER JOIN products ON cart.product_id = products.id
        WHERE cart.user_id = $1`, [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  checkProductId: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM cart where cart.product_id = $1', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  updateCartStock: (id, qty) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE cart set qty = $1 WHERE id = $2', [qty, id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}

module.exports = cartModel
