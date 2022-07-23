const pool = require('../config/db')
const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const addDataRegister = ({ id, name, email, password, roleId /*, phoneNumber, storeName */ }) => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users(id, name, email, password, role_id)VALUES($1, $2, $3, $4, $5)', [id, name, email, password, roleId], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const setStatus = (status, email) => {
  return new Promise((resolve, reject) => {
    pool.query('UPDATE users SET status = $1 WHERE email = $2', [status, email], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const updateProfile = ({ id, name, email, phonenumber, gender, birthdate, photo }) =>
  // eslint-disable-next-line promise/param-names
  new Promise((resolve, reject) => {
    return pool.query(`UPDATE users set
  name = COALESCE($1, name),
  email = COALESCE($2, email),
  phonenumber = COALESCE($3, phonenumber),
  gender = COALESCE($4, gender),
  birthdate = COALESCE($5, birthdate),
  photo = COALESCE($6, photo) WHERE id = $7
  `, [name, email, phonenumber, gender, birthdate, photo, id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })

const deleteModelUser = (id) => {
  return new Promise((resolve, reject) => {
    return pool.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    return pool.query('SELECT * FROM users', (err, result) => {
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
  addDataRegister,
  setStatus,
  deleteModelUser,
  getAllUsers,
  updateProfile
}
