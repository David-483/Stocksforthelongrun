const express = require('express')
const router = express.Router()
const Guru = require('../models/guru')

router.get('/', async (req, res) => {
    try {
      var totalvalues = [];
      var totalholdings = [];
      var categories = [];
    const gurus = await Guru.find({})

    for(i=0; i<= Object.keys(gurus[0].daten).length -1; i++){
      var JAHR = Object.keys(gurus[0].daten)[i];
      for(j=0; j<= Object.keys(gurus[0].daten[JAHR]).length -1; j++){
        var QUARTAL = Object.keys(gurus[0].daten[JAHR])[j];
        console.log(JAHR);
        console.log(QUARTAL);
        var totalvaluesWert = gurus[0].daten[JAHR][QUARTAL].totalValue;
        var totalHoldingsWert = gurus[0].daten[JAHR][QUARTAL].totalHoldings;
        totalvalues.push(totalvaluesWert);
        totalholdings.push(totalHoldingsWert);
      }
    }

    // for(z = 0; z <= Object.keys(kurs_total.data).length -1; z++){
    //   //console.log(kurs_total.data);
    //   KURS_KOMPLETT.push([kurs_total.data[z].date, kurs_total.data[z].adjusted_close]);
    // }

    var chartData = {"totalvalues" : totalvalues, "totalholdings" : totalholdings};
    var fullData = {gurus, "chartData": chartData};

    res.json(({Guru: fullData}));

    //res.render('gurus/index', {Guru: gurus})
    
    } catch (err){
      res.status(500).json({ message: err.message })
    }
})

router.get('/:guru', async (req, res) =>{
    try {
      var totalValues = [];
      var totalHoldings = [];
      var categories = [];
    const gurus = await Guru.find({})

    for(i=0; i<= Object.keys(gurus[0].daten).length -1; i++){
      var JAHR = Object.keys(gurus[0].daten)[i];
      
      for(j=0; j<= Object.keys(gurus[0].daten[JAHR]).length -1; j++){
        var QUARTAL = Object.keys(gurus[0].daten[JAHR])[j];
        var totalValuesWert = gurus[0].daten[JAHR][QUARTAL].totalValue;
        var totalHoldingsWert = gurus[0].daten[JAHR][QUARTAL].totalHoldings;
        categories.push(JAHR);
        totalValues.push(totalValuesWert);
        totalHoldings.push(totalHoldingsWert);
  
      }
            
    }

    // for(z = 0; z <= Object.keys(kurs_total.data).length -1; z++){
    //   //console.log(kurs_total.data);
    //   KURS_KOMPLETT.push([kurs_total.data[z].date, kurs_total.data[z].adjusted_close]);
    // }

    var chartData = {"totalValues" : totalValues, "totalHoldings" : totalHoldings, "categories": categories};
    var fullData = {gurus, "chartData": chartData};

    res.render('gurus/detail/index', {Guru: fullData})
} catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router