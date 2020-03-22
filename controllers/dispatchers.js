const dispatcherRouter = require('express').Router()
const Dispatcher = require('../models/dispatcher')

const checkAuth = require('../utils/middleware/auth-check')

dispatcherRouter.get('/', checkAuth, async (req, res, next) => {
  const { page, limit } = req.query
  const options = {
    page: +page || 1,
    limit: +limit || 10,
  }
  const dispatchers = await Dispatcher.paginate({}, options)

  res.json(dispatchers)
})

dispatcherRouter.get('/:id', checkAuth, async (req, res, next) => {
  try {
    const dispatcher = await Dispatcher.findById(req.params.id)
    res.json(dispatcher)
  } catch (err) {
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

dispatcherRouter.patch("/:id", checkAuth, (req, res, next) => {
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