const createError = require('http-errors')
const errMessage = createError.InternalServerError()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const { checkEmail, addDataRegister, setStatus, deleteModelUser, getAllUsers, updateDataUser, updateProfile } = require('../models/users')
const commonHelper = require('../helper/common')
const { generateToken, generateRefreshToken } = require('../helper/auth')
// const { sendEmail } = require('../helper/email')
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dbpfwb5ok',
  api_key: '117781545328253',
  api_secret: '1nAdMge0mf1KjuDwJi8CWPWpHx8'
})

const register = async (req, res, next) => {
  try {
    const { name, email, password /* , phoneNumber, storeName */ } = req.body
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
      password: hashPassword,
      // phoneNumber: phoneNumber || null,
      // storeName: storeName || null,
      roleId: 'customer'
    }
    await addDataRegister(dataRegister)
    delete dataRegister.password
    // sendEmail(email)
    commonHelper.response(res, dataRegister, 201, 'User berhasil ditambahkan')
  } catch (error) {
    console.log(error)
    next(createError('Internal Server Error'))
  }
}

const login = async (req, res, next) => {
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
      id: user.id,
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

const updateUser = async (req, res, next) => {
  try {
    const id = req.user.id
    // console.log(id)
    const image = await cloudinary.uploader.upload(req.file.path, { folder: 'blanja/user' })
    const data = {
      ...req.body,
      id,
      photo: image.secure_url
    }
    console.log(data)
    await updateProfile(data)
    // console.log(result)
    commonHelper.response(res, data, 200, 'Berhasil merubah data')
  } catch (error) {
    console.log(error)
    next(errMessage)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id
    console.log(id)
    await deleteModelUser(id)
    commonHelper.response(res, id, 200, 'User dengan id diatas berhasl dihapus')
  } catch (error) {
    console.log(error)
    next(errMessage)
  }
}

const searchUser = async (req, res, next) => {
  try {
    const { rows: [...users] } = await getAllUsers()
    commonHelper.response(res, users, 200, 'Berhasil mengambil data users')
  } catch (error) {
    console.log(error)
    next(errMessage)
  }
}

const profile = async (req, res, next) => {
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

const activation = async (req, res, next) => {
  try {
    const email = req.user.email
    const status = 'actived'
    const data = {
      email,
      status
    }
    await setStatus(status, email)
    commonHelper.response(res, data, 201, 'Congratulation Your Account Is Actived')
  } catch (error) {
    next(errMessage)
  }
}

module.exports = {
  register,
  login,
  profile,
  refreshToken,
  activation,
  deleteUser,
  searchUser,
  updateUser
}
