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
        tpye: String,
        required: false
      }
    })

module.exports = mongoose.model('Unternehmen', unternehmenSchema)