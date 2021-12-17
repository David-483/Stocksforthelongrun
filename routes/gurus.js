const express = require('express')
const router = express.Router()
const Guru = require('../models/guru')

router.get('/', async (req, res) => {
    try {
      const gurus = await Guru.find({})
    res.render('gurus/index', {Guru: gurus})
    
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

    var sectors = [];
    var sectorValues = [];

    for(j=0; j<= Object.keys(gurus[0].daten[JAHR][QUARTAL].infoTable).length -1; j++){
      var sectorEinheit = gurus[0].daten[JAHR][QUARTAL].infoTable[j].sector;
      var sectorValue = parseInt(gurus[0].daten[JAHR][QUARTAL].infoTable[j].value);
      // console.log(sectorEinheit);
      // console.log(sectorValue);
      if(j == 0){
        sectors.push(sectorEinheit);
        sectorValues.push(sectorValue);
      }
      else{
        if(sectors.includes(sectorEinheit)==true){
          for(k=0; k <= sectors.length; k++){
            if(sectors[k] == sectorEinheit){
                sectorValues[k] = sectorValues[k] + sectorValue;
            }
          }
        } else{
          sectors.push(sectorEinheit);
          sectorValues.push(sectorValue);
        }
      }
    }

    var sectorChartData = {"sectorValues" : sectorValues, "categories" : sectors};

    console.log(sectors);
    console.log(sectorValues);

    


    // for(z = 0; z <= Object.keys(kurs_total.data).length -1; z++){
    //   //console.log(kurs_total.data);
    //   KURS_KOMPLETT.push([kurs_total.data[z].date, kurs_total.data[z].adjusted_close]);
    // }

    var HoldingChartData = {"totalValues" : totalValues, "totalHoldings" : totalHoldings, "categories": categories};
    var fullData = {gurus, "HoldingChartData": HoldingChartData, "sectorChartData": sectorChartData};

    res.render('gurus/detail/index', {Guru: fullData})
} catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router