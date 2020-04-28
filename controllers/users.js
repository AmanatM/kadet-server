const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')
const {checkAuth} = require('../utils/middleware/auth-check')
const Dispatcher = require('../models/dispatcher')

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      surname: body.surname,
      name: body.name,
      email: body.email,
      passwordHash,
      admin: false
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', checkAuth, async (req, res) => {
  //const users = await User.find({}).populate('notes', { content: 1, date: 1 })
  const users = await User.find({})

  res.json(users.map(u => u.toJSON()))
})


usersRouter.get('/:id', checkAuth, async (req, res, next) => {

  try {
    const user = await User.findById(req.params.id) || await Dispatcher.findById(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

usersRouter.patch("/:id", checkAuth, (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: req.params.id }, { $set: updateOps })
    .exec()
    .then( () => {
      res.status(200).json({
        message: 'Updated successfuly'
      });
    })
    .catch(err => {
      next(err)
    });
});

module.exports = usersRouter