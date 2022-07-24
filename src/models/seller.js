const pool = require('../config/db')

const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM seller WHERE email = $1', [email], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const addDataSeller = ({ id, name, email, password, phoneNumber, storeName, roleId }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO seller(id, name, email, phone_number, password , store_name, roleId)VALUES($1, $2, $3, $4, $5, $6, $7)', [id, name, email, phoneNumber, password, storeName, roleId], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const updateProfile = ({ namestore, email, phonenumber, storedesc, photo, id }) =>
  new Promise((resolve, reject) => {
    return pool.query(`UPDATE seller set
    store_name = COALESCE($1, store_name),
    email = COALESCE($2, email),
    phone_number = COALESCE($3, phone_number),
    storedesc = COALESCE($4, storedesc),
    photo = COALESCE($5, photo) WHERE id = $6
    `, [namestore, email, phonenumber, storedesc, photo, id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })

const deleteSellerById = (id) => {
  return new Promise((resolve, reject) => {
    return pool.query('DELETE FROM seller WHERE id = $1', [id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const getAllSeller = () => {
  return new Promise((resolve, reject) => {
    return pool.query('SELECT * FROM seller', (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

module.exports = {
  checkEmail,
  addDataSeller,
  deleteSellerById,
  getAllSeller,
  updateProfile
}
