const serviceListRouter = require('express').Router()

const serviceList = ['Пакет номер 1', 'Пакет номер 2', 'Пакет номер 3', 'Пакет номер 4']

serviceListRouter.get('/', (req, res, next) => {
  res.json(serviceList)
})

module.exports = serviceListRouter