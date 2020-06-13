const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  born: {
    type: Number,
  },
})

module.exports = mongoose.model('author', schema)