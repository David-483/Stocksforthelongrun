const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const Unternehmen = require('../models/unternehmen')
const axios = require('axios')

'use strict';
var request = require('request');
const { data } = require('jquery')

var calculated_data = {};





//All Authors Route
router.get('/', (req, res) =>{
    //res.render('dashboard/index')
})


router.get('/:ticker', async (req, resp) => {

  var date_ob = new Date();
  console.log("Request Start:" + date_ob.getSeconds())
  
  // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
  //To-Do: Replace with current Ticker
  var link = "https://eodhistoricaldata.com/api/fundamentals/";
  var ticker = "AAPL.US";
  var api_token = "?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX";

  var filterGeneral="General::Name,General::CurrencySymbol,General::ISIN,General::IPODate,General::Sector,General::WebURL,General::FUllTimeEmployees,General::Code,General::Officers::0";
  var highlights="Highlights";
  var valuation="Valuation";
  var splitsDividends="SplitsDividends::PayoutRatio,SplitsDividends::DividendDate";
  var technicals="Technicals::ShortPercent";
  var analystRatings="AnalystRatings";
  var insiderTransactions="InsiderTransactions::0::transactionDate,InsiderTransactions::0::ownerName,InsiderTransactions::0::transactionAmount,InsiderTransactions::0::transactionPrice,InsiderTransactions::0::transactionAcquiredDisposed,InsiderTransactions::1::transactionDate,InsiderTransactions::1::ownerName,InsiderTransactions::1::transactionAmount,InsiderTransactions::1::transactionPrice,InsiderTransactions::1::transactionAcquiredDisposed,InsiderTransactions::2::transactionDate,InsiderTransactions::2::ownerName,InsiderTransactions::2::transactionAmount,InsiderTransactions::2::transactionPrice,InsiderTransactions::2::transactionAcquiredDisposed,InsiderTransactions::3::transactionDate,InsiderTransactions::3::ownerName,InsiderTransactions::3::transactionAmount,InsiderTransactions::3::transactionPrice,InsiderTransactions::3::transactionAcquiredDisposed,InsiderTransactions::4::transactionDate,InsiderTransactions::4::ownerName,InsiderTransactions::4::transactionAmount,InsiderTransactions::4::transactionPrice,InsiderTransactions::4::transactionAcquiredDisposed,InsiderTransactions::5::transactionDate,InsiderTransactions::5::ownerName,InsiderTransactions::5::transactionAmount,InsiderTransactions::5::transactionPrice,InsiderTransactions::5::transactionAcquiredDisposed"
  var holders="Holders::Institutions::0::name,Holders::Institutions::0::totalShares,Holders::Institutions::1::name,Holders::Institutions::1::totalShares,Holders::Institutions::2::name,Holders::Institutions::2::totalShares,Holders::Institutions::3::name,Holders::Institutions::3::totalShares,Holders::Institutions::4::name,Holders::Institutions::4::totalShares,Holders::Funds::0::name,Holders::Funds::0::totalShares,Holders::Funds::1::name,Holders::Funds::1::totalShares,Holders::Funds::2::name,Holders::Funds::2::totalShares,Holders::Funds::3::name,Holders::Funds::3::totalShares,Holders::Funds::4::name,Holders::Funds::4::totalShares"
  var outStandingShares="outstandingShares::annual";
  var earnings = "Earnings";
  var financials = "Financials";
  var URL_ALLE_DATEN = link + ticker + api_token + "&filter=" + filterGeneral + "," + highlights + "," + valuation + "," 
  + splitsDividends + "," + technicals + "," + analystRatings + "," + insiderTransactions + "," + holders + ","  
  + outStandingShares + "," + earnings + "," + financials;
  
  var url = 'https://eodhistoricaldata.com/api/fundamentals/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&filter=General::Code,Earnings::Annual,Highlights,Holders::Institutions';

  // LINK FÜR AKTIENKURS JAHR
    var today = new Date();
    var JAHRES_KURS_VON = (today.getFullYear()-1)+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var JAHRES_KURS_BIS =  today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var URL_AKTIENKURS_JAHR = 'https://eodhistoricaldata.com/api/eod/MCD.US?from='+JAHRES_KURS_VON+'+&to='+JAHRES_KURS_BIS+'&period=d&fmt=json&api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&order=d';
    
    //LINK FÜR DIVIDENDEN
    var URL_DIVIDENDEN = 'https://eodhistoricaldata.com/api/div/AAPL.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&fmt=json';
    var date_ob = new Date();
    console.log("URLs zusammen:" + date_ob.getSeconds())

  axios.all([
    axios.get(URL_ALLE_DATEN),
    axios.get(URL_AKTIENKURS_JAHR),
    // axios.get('https://eodhistoricaldata.com/api/eod/MCD.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&period=annual&order=d&fmt=json'),
    axios.get(URL_AKTIENKURS_JAHR),
    axios.get('https://eodhistoricaldata.com/api/eod/MCD.US?api_token=OeAFFmMliFG5orCUuwAKQ8l4WWFQ67YX&period=m&fmt=json&order=d'),
    axios.get(URL_DIVIDENDEN),
  ])
  .then(axios.spread((ALLE_DATEN, kurs_total, kurs_yearly, kurs_monthly, dividenden) => {
    var date_ob = new Date();
    console.log("Alle Daten gezogen:" + date_ob.getSeconds())
    //console.log('Date created: ', test1.data);
    //console.log('Date created: ', url2.data);
    //let z = Object.assign(test1.data, url2.data);

    //console.log(kurs_monthly.data[0].date)
    //console.log(dividenden.data)



    

    var DIVIDENDEN = [];
    var KURS_KOMPLETT = [];

    var PEH = [];
    var PSH = [];
    var PBH = [];
    var DYH  = [];
    var DURSCHNITT_PEH = 0;
    var DURSCHNITT_PSH = 0;
    var DURSCHNITT_PBH = 0;

    console.log("Kurs komplett angefangen");
    for(z = 0; z <= Object.keys(kurs_total.data).length -1; z++){
      //console.log(kurs_total.data);
      KURS_KOMPLETT.push([kurs_total.data[z].date, kurs_total.data[z].adjusted_close]);
    }
    var date_ob = new Date();
    console.log("Kurs geladen" + date_ob.getSeconds())


    for(i = 0; i < 10; i++){
      var JAHR = Object.keys(ALLE_DATEN.data.Financials.Income_Statement.yearly)[i];
      var eps = ALLE_DATEN.data.Earnings.Annual[JAHR].epsActual;
      var total_rev = ALLE_DATEN.data.Financials.Income_Statement.yearly[JAHR].totalRevenue;
      var calc_outstandingShares = ALLE_DATEN.data.Financials.Balance_Sheet.yearly[JAHR].commonStockSharesOutstanding;
      var totalequity = ALLE_DATEN.data.Financials.Balance_Sheet.yearly[JAHR].totalStockholderEquity;
      var checkJahr = JAHR.substring(0,7);
      //console.log(kurs_monthly.data[i].high);
      for(j=1; j <= Object.keys(kurs_monthly.data).length -1; j++){
        if((kurs_monthly.data[j].date).substring(0,7) == checkJahr){
          var adjusted_close = kurs_monthly.data[j].adjusted_close;
        }
      }

      

      for(j = dividenden.data.length-1; j>=0; j--){
        if((dividenden.data[j].date).substring(0,4) == (JAHR.substring(0,4))){
          DIVIDENDEN[j] = [dividenden.data[j].value.toFixed(2), JAHR.substring(0,4)];
        }
      }
        

      var calculated_PEH = adjusted_close/eps;
      var calculated_PSH = adjusted_close / (total_rev /calc_outstandingShares);
      var calculated_PBH = adjusted_close / (totalequity /calc_outstandingShares);

      DURSCHNITT_PEH = calculated_PEH + DURSCHNITT_PEH;
      DURSCHNITT_PSH = calculated_PSH + DURSCHNITT_PSH;
      DURSCHNITT_PBH = calculated_PBH + DURSCHNITT_PBH;

      
      PEH.unshift([JAHR.substring(0,4), calculated_PEH.toFixed(2)]);
      PSH.unshift([JAHR.substring(0,4), calculated_PSH.toFixed(2)]);
      PBH.unshift([JAHR.substring(0,4), calculated_PBH.toFixed(2)]);
    }
    DURSCHNITT_PEH = DURSCHNITT_PEH / 10;
    DURSCHNITT_PSH = DURSCHNITT_PSH / 10;
    DURSCHNITT_PBH = DURSCHNITT_PBH / 10;

    

    var REVTREND = Object.keys(ALLE_DATEN.data.Earnings.Trend)[1];
    var PSG = ALLE_DATEN.data.Valuation.PriceSalesTTM / (ALLE_DATEN.data.Earnings.Trend[REVTREND].revenueEstimateAvg / calc_outstandingShares);

    var DIVGROWTHYEARCHECK = 2017;
    var DIVIDENDE_5_YEARS_AGO = 0;


    for(i = dividenden.data.length-1; i>=0; i--){
      if((dividenden.data[i].date).substring(0,4) == DIVGROWTHYEARCHECK){
        DIVIDENDE_5_YEARS_AGO = dividenden.data[i].value + DIVIDENDE_5_YEARS_AGO;
      }
    }

    var DIVGROWTH = ( Math.pow((ALLE_DATEN.data.Highlights.DividendShare / DIVIDENDE_5_YEARS_AGO), 0.2) -1 ) *100;

    var MARGINYEAR = Object.keys(ALLE_DATEN.data.Financials.Income_Statement.yearly)[0];
    var GrossMargin = ALLE_DATEN.data.Financials.Income_Statement.yearly[MARGINYEAR].costOfRevenue / ALLE_DATEN.data.Highlights.RevenueTTM *100;
    var EBITMargin = ALLE_DATEN.data.Financials.Income_Statement.yearly[MARGINYEAR].ebit / ALLE_DATEN.data.Highlights.RevenueTTM *100;
    var ProfitMargin = ALLE_DATEN.data.Financials.Income_Statement.yearly[MARGINYEAR].netIncome / ALLE_DATEN.data.Highlights.RevenueTTM *100;

    var ROE = ALLE_DATEN.data.Highlights.ReturnOnEquityTTM * 100;
    var ROA = ALLE_DATEN.data.Highlights.ReturnOnAssetsTTM * 100;

    var DivYield = ALLE_DATEN.data.Highlights.DividendYield * 100;
    var Payout = ALLE_DATEN.data['SplitsDividends::PayoutRatio'] * 100;

    var nextDiv = (ALLE_DATEN.data['SplitsDividends::DividendDate']);

    var TrailingPe = ALLE_DATEN.data.Highlights.PERatio;
    var PEG = ALLE_DATEN.data.Highlights.PEGRatio;
    var PS = ALLE_DATEN.data.Valuation.PriceSalesTTM;
    var PriceBookMRQ = ALLE_DATEN.data.Valuation.PriceBookMRQ;
    
    

  
    
   
    var Sonstiges = {"PSG": PSG.toFixed(2), "DIVGROWTH": Number(DIVGROWTH.toFixed(2)), "GrossMargin": Number(GrossMargin.toFixed(2)),
     "EBITMargin": Number(EBITMargin.toFixed(2)), "ProfitMargin": Number(ProfitMargin.toFixed(2)), "ROE": Number(ROE.toFixed(2)), "ROA": Number(ROA.toFixed(2)),
    "DivYield": DivYield, "Payout": Payout, "TrailingPe": Number(TrailingPe.toFixed(2)), "PEG": Number(PEG.toFixed(2)), "PS": Number(PS.toFixed(2)), 
    "PriceBookMRQ": Number(PriceBookMRQ.toFixed(2)), 
    "DURSCHNITT_PEH": Number(DURSCHNITT_PEH.toFixed(0)), "DURSCHNITT_PSH": Number(DURSCHNITT_PSH.toFixed(0)), "DURSCHNITT_PBH" : Number(DURSCHNITT_PBH.toFixed(0))};



    
     
    var SparkChart = {"PEH" : PEH, "PSH" : PSH, "PBH": PBH, "DYH": DYH};
       
    var Test = { "Kurs_Jahr" : kurs_yearly.data, "Kurs_Total" : KURS_KOMPLETT, "General" : ALLE_DATEN.data, "SparkChart" : SparkChart, "Sonstiges": Sonstiges};
    var date_ob = new Date();
    console.log("Alle Berechnungen" + date_ob.getSeconds())
    resp.render('dashboard/index2', ({unternehmen: Test}))
    //resp.json(({unternehmen: Test}));
  }));

  

























  /*
  try{   
    request.get({
    url: testUrl,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:

     
      


      console.log(data);
      resp.json(data);
      //resp.render('dashboard/index2', { unternehmen: data })
    }
});
 }

catch (err){
  res.status(500).json({ message: err.message })
            }
*/

});


module.exports = router