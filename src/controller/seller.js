const createError = require('http-errors')
const { checkEmail, addDataSeller, deleteSellerById, getAllSeller } = require('../models/seller')
const errMessage = createError.InternalServerError()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const commonHelper = require('../helper/common')
const { generateToken, generateRefreshToken } = require('../helper/auth')

const sellerRegister = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, storeName } = req.body
    console.log(email)
    const { rowCount } = await checkEmail(email)
    if (rowCount) {
      return next(createError(403, 'User sudah terdaftar'))
    }
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    const dataRegister = {
      id: uuidv4(),
      name,
      email,
      phoneNumber,
      storeName,
      roleId: 2,
      password: hashPassword
    }
    await addDataSeller(dataRegister)
    commonHelper.response(res, dataRegister, 201, 'seller berhasil ditambahkan')
  } catch (error) {
    console.log(error)
    next(createError('Internal Server Error'))
  }
}

const sellerLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const { rows: [user] } = await checkEmail(email)
    if (!user) {
      return commonHelper.response(res, null, 403, 'email atau password anda salah')
    }
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) {
      return commonHelper.response(res, null, 403, 'email atau password anda salah')
    }
    delete user.password
    const payload = {
      email: user.email,
      role: user.role_id
    }
    // const dataUser = {
    //   name: user.name,
    //   email: user.email,
    //   role: user.role_id
    // }
    user.token = generateToken(payload)
    user.refreshToken = generateRefreshToken(payload)
    commonHelper.response(res, user, 201, 'Anda berhasil Login')
  } catch (error) {
    console.log(error)
    next(new createError.InternalServerError())
  }
}

const deleteSeller = async (req, res, next) => {
  try {
    const id = req.params.id
    console.log(id)
    await deleteSellerById(id)
    commonHelper.response(res, id, 200, 'User dengan id diatas berhasl dihapus')
  } catch (error) {
    console.log(error)
    next(errMessage)
  }
}

const searchSeller = async (req, res, next) => {
  try {
    const { rows: [...users] } = await getAllSeller()
    commonHelper.response(res, users, 200, 'Berhasil mengambil data users')
  } catch (error) {
    console.log(error)
    next(errMessage)
  }
}

const profileSeller = async (req, res, next) => {
  try {
    const email = req.user.email
    const { rows: [user] } = await checkEmail(email)
    delete user.password
    commonHelper.response(res, user, 200, 'Berhasil mengambil data')
  } catch (error) {
    console.log(error)
    next(errMessage)
  }
}

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN)
  const payload = {
    email: decoded.email,
    role: decoded.role
  }
  const result = {
    token: generateToken(payload),
    refreshToken: generateRefreshToken(payload)
  }

  commonHelper.response(res, result, 200)
}

module.exports = {
  sellerRegister,
  sellerLogin,
  deleteSeller,
  searchSeller,
  profileSeller,
  refreshToken
}
