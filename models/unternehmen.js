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
      },
      searchable: {
        type: String,
        required: true
      },
      'company_data.ticker':{
        type: String,
        required: false
      },
      'revenue.2010':{
        type: String,
        required: false
      }
    })

module.exports = mongoose.model('Unternehmen', unternehmenSchema)