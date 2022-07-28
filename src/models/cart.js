const pool = require('../config/db')

const cartModel = {
  createCart: ({ id, userId, productId, qty }) => {
    console.log('ini yang ditambah ke cart')
    console.log(`id ${id}, userId ${userId}, ${productId} ${qty}`)
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
      pool.query(`SELECT cart.id AS cart_id, cart.user_id, cart.product_id, cart.id, cart.qty,
        products.name, products.price, products.brand, products.photo FROM cart INNER JOIN products ON cart.product_id = products.id
        WHERE cart.user_id = $1`, [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },
  checkProductId: (productId, userId) => {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM cart where cart.product_id = $1 AND cart.user_id = $2', [productId, userId], (err, result) => {
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
  },

  updateCartStockV2: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE cart set qty = (qty + 1) WHERE id = $1', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  decreaseStock: (id) => {
    return new Promise((resolve, reject) => {
      pool.query('UPDATE cart set qty = (qty - 1) WHERE id = $1', [id], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  deleteCart: (id) => {
    console.log(id)
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM cart where id = $1', [id], (err, result) => {
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
