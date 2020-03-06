const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const dispatcherSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

dispatcherSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

dispatcherSchema.plugin(uniqueValidator)
const Dispatcher = mongoose.model('Dispatcher', dispatcherSchema)

module.exports = Dispatcher