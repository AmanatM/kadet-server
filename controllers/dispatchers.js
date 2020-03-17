const dispatcherRouter = require('express').Router()
const Dispatcher = require('../models/dispatcher')

const checkAuth = require('../utils/middleware/auth-check')

dispatcherRouter.get('/', checkAuth, async (req, res, next) => {
  const dispatchers = await Dispatcher.find({})

  res.json(dispatchers.map(dispatcher => dispatcher.toJSON()))
})

dispatcherRouter.get('/:id', checkAuth, async (req, res, next) => {
  try {
    const dispatcher = await Dispatcher.findById(req.params.id)
    res.json(dispatcher)
  } catch(err) {
    next(err)
  }
})

dispatcherRouter.post('/', checkAuth, async (req, res, next) => {
  try {
    const body = req.body

    const dispatcher = new Dispatcher({
      username: body.username,
      name: body.name,
      surname: body.surname,
      position: body.position,
      status: body.status,
      SIPNumber: body.SIPNumber
    })

    const savedDispatcher = await dispatcher.save()
    res.json(savedDispatcher)

  } catch (err) {
    next(err)
  }
})

dispatcherRouter.delete('/:id', checkAuth, async (req, res, next) => {
  Dispatcher.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: 'Deleted successfuly'
      })
      next()
    })
    .catch((err) => {
      next(err)
    })
})


module.exports = dispatcherRouter