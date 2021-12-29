const express = require('express')
const router = express.Router()
const Guru = require('../models/guru')

router.get('/', async (req, res) => {
  try {
    const gurus = await Guru.find({})
    res.render('gurus/index', { Guru: gurus })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:guru', async (req, res) => {
  try {
    var totalValues = [];
    var totalHoldings = [];
    var categories = [];
    const gurus = await Guru.find({})
    for (i = 0; i <= Object.keys(gurus[0].daten).length - 1; i++) {
      var JAHR = Object.keys(gurus[0].daten)[i];
      for (j = 0; j <= Object.keys(gurus[0].daten[JAHR]).length - 1; j++) {
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


    for (j = 0; j <= Object.keys(gurus[0].daten[JAHR][QUARTAL].infoTable).length - 1; j++) {
      var sectorEinheit = gurus[0].daten[JAHR][QUARTAL].infoTable[j].sector;
      var sectorValue = parseInt(gurus[0].daten[JAHR][QUARTAL].infoTable[j].value);
      if (j == 0) {
        sectors.push(sectorEinheit);
        sectorValues.push(sectorValue);
      }
      else {
        if (sectors.includes(sectorEinheit) == true) {
          for (k = 0; k <= sectors.length - 1; k++) {
            if (sectors[k] == sectorEinheit) {
              sectorValues[k] = sectorValues[k] + sectorValue;
            }
          }
        } else {
          sectors.push(sectorEinheit);
          sectorValues.push(sectorValue);
        }
      }
    }

    var sectorChartData = { "sectorValues": sectorValues, "categories": sectors };

    var topTenHoldings = [];
    var topTenHoldingsChart = [];

    for (j = 0; j <= Object.keys(gurus[0].daten[JAHR][QUARTAL].infoTable).length - 1; j++) {
      var topTenHoldingName = gurus[0].daten[JAHR][QUARTAL].infoTable[j].name;
      var topTenHoldingAnteil = parseFloat(gurus[0].daten[JAHR][QUARTAL].infoTable[j].portfolioAnteil);


      topTenHoldings.push([topTenHoldingName, topTenHoldingAnteil]);
    }

    if (topTenHoldings.length >= 10) {
      topTenHoldings = topTenHoldings.sort(function (a, b) {
        return a[1] - b[1];
      });
      topTenHoldings = topTenHoldings.reverse();
      for (k = 0; k <= 10; k++) {
        topTenHoldingsChart.push({ "x": topTenHoldings[k][0], "y": topTenHoldings[k][1] });
      }
    } else {
      for (k = 0; k <= topTenHoldings.length - 1; k++) {
        topTenHoldingsChart.push({ "x": topTenHoldings[k][0], "y": topTenHoldings[k][1] });
      }
    }

    // HIER VERLAUF VON SEKTOR ÜBER ZEIT
    var ALLESEKTOREN = ["Energie", "Finanzen", "Fonds", "Gesundheit", "Basiskonsumgüter", "Immobilien", "Industrie", "Kommunikation", "Nicht-Basiskonsumgüter", "Informationstechnologie", "Versorger", "Material", "Kryptowährungen"];
    var ALLESEKTORENMITDATEN = [];
    var Energie = [];
    var Finanzen = [];
    var Fonds = [];
    var Gesundheit = [];
    var Basiskonsumgüter = [];
    var Immobilien = [];
    var Industrie = [];
    var Kommunikation = [];
    var Nicht_Basiskonsumgüter = [];
    var Informationstechnologie = [];
    var Versorger = [];
    var Material = [];
    var Kryptowährungen = [];

    var sectorOverTimeCategories = [];

    // for(i=0; i<= Object.keys(gurus[0].daten).length -1; i++){
    //   var JAHR = Object.keys(gurus[0].daten)[i];


    // BEGINN CHART SEKTOR ÜBER ZEIT

    var energieValue = 0;
    var finanzenValue = 0;
    var fondsValue = 0;
    var gesundheitsValue = 0;
    var BasiskonsumgüterValue = 0;
    var immobilienValue = 0;
    var industrieValue = 0;
    var kommunikationsValue = 0;
    var nicht_BasiskonsumgüterValue = 0;
    var informationstechnologieValue = 0;
    var versorgerValue = 0;
    var materialValue = 0;
    var kryptowährungenValue = 0;

    for (i = 0; i < 2; i++) {
      var JAHR = 2020 + i;

      for (j = 0; j <= Object.keys(gurus[0].daten[JAHR]).length - 1; j++) {
        var QUARTAL = Object.keys(gurus[0].daten[JAHR])[j];
        for (k = 0; k <= Object.keys(gurus[0].daten[JAHR][QUARTAL].infoTable).length - 1; k++) {

          var sectorEinheit = gurus[0].daten[JAHR][QUARTAL].infoTable[k].sector;
          var sectorValue = parseInt(gurus[0].daten[JAHR][QUARTAL].infoTable[k].value);

          if (sectorEinheit == "Energie") {
            energieValue = energieValue + sectorValue;
          }
          if (sectorEinheit == "Finanzen") {
            finanzenValue = finanzenValue + sectorValue;
          }
          if (sectorEinheit == "Fonds") {
            fondsValue = fondsValue + sectorValue;
          }
          if (sectorEinheit == "Gesundheit") {
            gesundheitsValue = gesundheitsValue + sectorValue;
          }

          if (sectorEinheit == "Basiskonsumgüter") {
            BasiskonsumgüterValue = BasiskonsumgüterValue + sectorValue;
          }
          if (sectorEinheit == "Immobilien") {
            immobilienValue = immobilienValue + sectorValue;
          }
          if (sectorEinheit == "Industrie") {
            industrieValue = industrieValue + sectorValue;
          }
          if (sectorEinheit == "Kommunikation") {
            kommunikationsValue = kommunikationsValue + sectorValue;
          }
          if (sectorEinheit == "Nicht-Basiskonsumgüter") {
            nicht_BasiskonsumgüterValue = nicht_BasiskonsumgüterValue + sectorValue;
          }
          if (sectorEinheit == "Informationstechnologie") {
            informationstechnologieValue = informationstechnologieValue + sectorValue;
          }
          if (sectorEinheit == "Versorger") {
            versorgerValue = versorgerValue + sectorValue;
          }
          if (sectorEinheit == "Material") {
            materialValue = materialValue + sectorValue;
          }
          if (sectorEinheit == "Kryptowährungen") {
            kryptowährungenValue = kryptowährungenValue + sectorValue;
          }

          // Letzter durchlauf von Infotable, um Werte in Array zu schreiben und Value zu resetten

          if (k == Object.keys(gurus[0].daten[JAHR][QUARTAL].infoTable).length - 1) {
            Energie.push(energieValue);
            Finanzen.push(finanzenValue);
            Fonds.push(fondsValue);
            Gesundheit.push(gesundheitsValue);
            Basiskonsumgüter.push(BasiskonsumgüterValue);
            Immobilien.push(immobilienValue);
            Industrie.push(industrieValue);
            Kommunikation.push(kommunikationsValue);
            Nicht_Basiskonsumgüter.push(nicht_BasiskonsumgüterValue);
            Informationstechnologie.push(informationstechnologieValue);
            Versorger.push(versorgerValue);
            Material.push(materialValue);
            Kryptowährungen.push(kryptowährungenValue);

            finanzenValue = 0;
            fondsValue = 0;
            gesundheitsValue = 0;
            BasiskonsumgüterValue = 0;
            immobilienValue = 0;
            industrieValue = 0;
            kommunikationsValue = 0;
            nicht_BasiskonsumgüterValue = 0;
            informationstechnologieValue = 0;
            versorgerValue = 0;
            materialValue = 0;
            kryptowährungenValue = 0;

            sectorOverTimeCategories.push(JAHR + ' ' + QUARTAL);
          }
        }
      }
    }

    // ENDE VERLAUF VON SEKTOR ÜBER ZEIT


    // Abschnitt für Unterschiede vom letzten Quartal

    var lastTimeQuartal = gurus[0].details.MRQ_1;
    var lastTimeYear = gurus[0].details.previousGuruQuartalYear;
    var alreadyChecked = "false";

    var currenTimeQuartal = gurus[0].details.MRQ;
    var currentTimeYear = gurus[0].details.currentGuruYear;

    console.log(lastTimeQuartal)
    console.log(lastTimeYear)
    console.log(currenTimeQuartal)
    console.log(currentTimeYear)

    var currentQuartal = [];
    var zugänge = [];
    var abgänge = [];
    var lastQuartal = [];

    for (i = 0; i <= Object.keys(gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable).length - 1; i++) {
      var ISIN = gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].id;
      var newShares = gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].shares;
      for (j = 0; j <= Object.keys(gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable).length - 1; j++) {
        var PREVISIN = gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable[j].id;
        var PREVSHARES = gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable[j].shares;
        if (ISIN == PREVISIN) {
          alreadyChecked = "true";
          if (newShares == PREVSHARES) {
            currentQuartal.push({
              "name": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].name,
              "sector": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].sector,
              "value": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].value,
              "shares": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].shares,
              "portfolioAnteil": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].portfolioAnteil,
              "ticker": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].ticker,
              "changes": "0"
            })
          } else {

            var changes = newShares - PREVSHARES;
            changes = (changes / PREVSHARES * 100).toFixed(2);
            currentQuartal.push({
              "name": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].name,
              "sector": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].sector,
              "value": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].value,
              "shares": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].shares,
              "portfolioAnteil": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].portfolioAnteil,
              "ticker": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].ticker,
              "changes": changes
            })

            var changes = newShares - PREVSHARES;
            changes = (changes / PREVSHARES * 100).toFixed(2);
            if (PREVSHARES < newShares) {
              console.log("zugang von " + gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].name)
              zugänge.push({
                "name": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].name,
                "sector": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].sector,
                "value": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].value,
                "shares": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].shares,
                "portfolioAnteil": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].portfolioAnteil,
                "ticker": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].ticker,
                "changes": changes
              })
            } else {
              console.log("abgang von " + gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].name)
              abgänge.push({
                "name": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].name,
                "sector": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].sector,
                "value": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].value,
                "shares": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].shares,
                "portfolioAnteil": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].portfolioAnteil,
                "ticker": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].ticker,
                "changes": changes
              })
            }
          }
        }
        if (j == Object.keys(gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable).length - 1) {
          if (alreadyChecked == "true") {
            alreadyChecked = "false";
          } else {
            currentQuartal.push({
              "name": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].name,
              "sector": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].sector,
              "value": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].value,
              "shares": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].shares,
              "portfolioAnteil": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].portfolioAnteil,
              "ticker": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].ticker,
              "changes": "+100%"
            })
            zugänge.push({
              "name": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].name,
              "sector": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].sector,
              "value": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].value,
              "shares": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].shares,
              "portfolioAnteil": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].portfolioAnteil,
              "ticker": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].ticker,
              "changes": "+100%"
            })
          }
        }
      }
    }

    for (j = 0; j <= Object.keys(gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable).length - 1; j++) {
      var PREVISIN = gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable[j].id;
      var PREVSHARES = gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable[j].shares;

      for (i = 0; i <= Object.keys(gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable).length - 1; i++) {
        var ISIN = gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].id;
        var newShares = gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].shares;

        if (PREVISIN == ISIN) {
          alreadyChecked = "true";
        }

        if (i == Object.keys(gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable).length - 1) {
          if (alreadyChecked == "true") {
            alreadyChecked = "false";
          } else {
            abgänge.push({
              "name": gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable[j].name,
              "sector": gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable[j].sector,
              "value": gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable[j].value,
              "shares": gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable[j].shares,
              "portfolioAnteil": gurus[0].daten[lastTimeYear][lastTimeQuartal].infoTable[j].portfolioAnteil,
              "ticker": gurus[0].daten[currentTimeYear][currenTimeQuartal].infoTable[i].ticker,
              "changes": "-100%",
            })
          }
        }
      }
    }
  


       

        var depotData = {
          "zugänge": zugänge,
          "abgänge": abgänge,
          "currentQuartal": currentQuartal,
          "totalHoldings": currentQuartal.length
        }

 console.log(depotData);

        var trendChartData = {
          "sectorOverTimeCategories": sectorOverTimeCategories, "Energie": Energie, "Finanzen": Finanzen, "Fonds": Fonds, "Gesundheit": Gesundheit, "Basiskonsumgüter": Basiskonsumgüter, "Immobilien": Immobilien,
          "Industrie": Industrie, "Kommunikation": Kommunikation, "Nicht_Basiskonsumgüter": Nicht_Basiskonsumgüter, "Informationstechnologie": Informationstechnologie, "Versorger": Versorger,
          "Material": Material, "Kryptowährungen": Kryptowährungen
        };



        var topTenHoldingsChartData = { "topTenHoldingChartData": topTenHoldingsChart };
        var HoldingChartData = { "totalValues": totalValues, "totalHoldings": totalHoldings, "categories": categories };
        var fullData = { gurus, "HoldingChartData": HoldingChartData, "sectorChartData": sectorChartData, topTenHoldingsChartData, "trendChartData": trendChartData,  "depotData": depotData};

        //res.json({Guru: fullData})
        res.render('gurus/detail/index', { Guru: fullData })
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
    })

module.exports = router