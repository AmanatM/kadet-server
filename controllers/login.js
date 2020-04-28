const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/users')
const Dispatcher = require('../models/dispatcher')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username }) || await Dispatcher.findOne({ username: body.username })

  let passwordCorrect

  if (user.admin) {
    passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)
  } else {
    passwordCorrect = user.password === body.password ? true : false
  }

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username,
    admin: user.admin
  }

  const token = jwt.sign(userForToken, process.env.JWT_KEY)

  response
    .status(200)
    .send({ token, id: user._id, username: user.username, name: user.name, admin: user.admin })
})

module.exports = loginRouter