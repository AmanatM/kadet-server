const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const mongoosePaginate = require('mongoose-paginate')

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
  position: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  SIPNumber: {
    type: Number,
    minlength: 3,
    required: true
  },
  //Extended
  phoneNumber: {
    type: Number,
    minlength: 5
  },
  email: {
    type: String
  },
  processedApplications: {
    type: Number
  },
  jobStartedDate: {
    type: Date
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
dispatcherSchema.plugin(mongoosePaginate)

const Dispatcher = mongoose.model('Dispatcher', dispatcherSchema)

module.exports = Dispatcher