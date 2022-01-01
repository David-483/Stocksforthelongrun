const mongoose = require('mongoose')

const searchstuffSchema = new mongoose.Schema({
    Code: {
        type: String,
        required: true
      },
    Name: {
        type: String,
        required: true
      },
    category: {
        type: String,
        required: true
      },
      searchable:{
          type: String,
          required: false
      }
    })

module.exports = mongoose.model('searchstuff', searchstuffSchema)