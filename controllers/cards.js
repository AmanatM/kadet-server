const cardRouter = require('express').Router()
const Card = require('../models/cards')
const {checkAdmin, checkAuth} = require('../utils/middleware/auth-check')


cardRouter.get('/',checkAuth, async (req, res, next) => {

  const { page, limit } = req.query
  const options = {
    page: +page || 1,
    limit: +limit || 10,
  }
  const cards = await Card.paginate({}, options)

  res.json(cards)
})

cardRouter.get('/:id', async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id)
    res.json(card)
  } catch (err) {
    next(err)
  }
})


cardRouter.patch("/:id", checkAuth, (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Card.update({ _id: req.params.id }, { $set: updateOps })
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


const getRandom = (length) => Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1))

cardRouter.post('/', async (req, res, next) => {
  try {

    const { cardPrice, serviceList } = req.body

    let number = getRandom(Math.random() * (17 - 4) + 4)

    const card = new Card({
      number, cardPrice, serviceList, active: false
    })

    const savedCard = await card.save()
    res.json(savedCard)

  } catch (err) {
    next(err)
  }
})

cardRouter.put('/activate/:id', async (req, res, next) => {
  try {
    // const { cardPrice, cardHolder, phoneNumber, city, VINnumber, paid, validityMonths, dateActivated, dateSold, carNumber, carMake, carColor, email } = req.body

    // const card = new Card({
    //   cardPrice, active: true, cardHolder, phoneNumber, city, VINnumber, paid, validityMonths, dateActivated, dateSold, carNumber, carMake, carColor, email
    // })

    Card.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, card) => {
      if (err) return res.status(500).send(err);
      return res.send(card);
    })


  } catch (err) {
    next(err)
  }
})

cardRouter.post('/multiple', async (req, res, next) => {
  try {
    const { cardsAmount } = req.body
    if (cardsAmount) {

      for (let i = 0; i < cardsAmount; i++) {
        const { serviceList } = req.body

        let number = getRandom(Math.random() * (17 - 4) + 4)

        const card = new Card({
          number, serviceList, active: false
        })

        const savedCard = await card.save()
      }

      res.json({ message: 'Cards created successful' })

    } else {
      res.status(500).json({ message: 'Range is required!' })
    }

  } catch (err) {
    next(err)
  }
})

cardRouter.delete('/:id', async (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
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

module.exports = cardRouter