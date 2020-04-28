const dispatcherRouter = require('express').Router()
const Dispatcher = require('../models/dispatcher')
const jwt = require('jsonwebtoken')
const chalk = require('chalk')

const { checkAuth, checkAdmin } = require('../utils/middleware/auth-check')

dispatcherRouter.get('/', checkAdmin, async (req, res, next) => {
  const { page, limit } = req.query

  const options = {
    page: +page || 1,
    limit: +limit || 10
  }

  const token = req.headers.authorization.split(' ')[1]
  const decoded = jwt.verify(token, process.env.JWT_KEY)

  if (decoded.admin) {
    const dispatchers = await Dispatcher.paginate({}, options)
    res.json(dispatchers)
  } else {
    const dispatchers = await Dispatcher.paginate({}, options)
    res.json(dispatchers)
  }

})

dispatcherRouter.get('/:id', checkAdmin, async (req, res, next) => {
  try {
    const dispatcher = await Dispatcher.findById(req.params.id)
    res.json(dispatcher)

  } catch (err) {
    next(err)
  }
})

dispatcherRouter.post('/', checkAdmin, async (req, res, next) => {
  try {
    const body = req.body

    const dispatcher = new Dispatcher({
      username: body.username,
      name: body.name,
      surname: body.surname,
      position: body.position,
      status: body.status,
      SIPNumber: body.SIPNumber,
      phoneNumber: body.phoneNumber,
      email: body.email,
      password: body.password,
      jobStartedDate: body.jobStartedDate,
      processedApplications: body.processedApplications,
    })

    const savedDispatcher = await dispatcher.save()
    res.json(savedDispatcher)

  } catch (err) {
    next(err)
  }
})

dispatcherRouter.patch("/:id", checkAdmin, (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Dispatcher.update({ _id: req.params.id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Updated successfuly'
      });
    })
    .catch(err => {
      next(err)
    });
});

dispatcherRouter.delete('/:id', checkAdmin, async (req, res, next) => {
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