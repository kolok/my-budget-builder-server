'use strict'

const mongoose = require('mongoose')

// With Mongoose, everything is derived from a Schema.
var companySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true // FIXME: didn't works as expected
  },
  info: String
})

// Compiling our schema into a Model.
module.exports = mongoose.model('Company', companySchema)
