const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoosePaginate = require('mongoose-paginate')


const cardSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    unique: true
  },
  serviceList: {
    type: String,
    required: true
  },
  cardHolder: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  city: {
    type: String
  },
  VINnumber: {
    type: String
  },
  active: {
    type: Boolean,
    required: true
  },
  paid: {
    type: Boolean
  },
  validityMonths: {
    type: Number, //In months
  },
  dateActivated: {
    type: Date
  },
  dateSold: {
    type: Date
  },
  carNumber: {
    type: String
  },
  carMake: {
    type: String
  },
  carColor: {
    type: String
  },
  email: {
    type: String
  },
  cardPrice: {
    type: String
  }
})

cardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

cardSchema.plugin(uniqueValidator)
cardSchema.plugin(mongoosePaginate)

const Card = mongoose.model('Card', cardSchema)

module.exports = Card