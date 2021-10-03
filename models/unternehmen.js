const mongoose = require('mongoose')

const unternehmenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      umsatz: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      }
    })

module.exports = mongoose.model('Unternehmen', unternehmenSchema)