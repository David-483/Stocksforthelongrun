const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const Unternehmen = require('../models/unternehmen')

'use strict';
var request = require('request');

var calculated_data = {};



//All Authors Route
router.get('/', (req, res) =>{
    res.render('dashboard/index')
})


router.get('/:ticker', async (req, resp) => {
  
  // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
  //To-Do: Replace with current Ticker
  var url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=SZ4FSXKD79GKTTTU';


  try{ 
  const unternehmens = await Unternehmen.findOne({
      $and: [ 
        {
          'company_data.ticker':{'$regex':req.params.ticker , '$options' : 'i'}},
        {searchable: { $exists:false}},
      ]},
 ).select('-_id');
 if(unternehmens == null){
  res.render('index')
 }else{
    
    request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      //console.log(data);
      berechneDaten(data, unternehmens); 
      var fullData= JSON.stringify({unternehmen: unternehmens, calculated: calculated_data}); 
      var fullDataJSON = JSON.parse(fullData);
      console.log(fullDataJSON);
      resp.render('dashboard/index', fullDataJSON)
    }
});
 }
}
catch (err){
  res.status(500).json({ message: err.message })
            }
});

function berechneDaten(data, unternehmens) {
  //Irgendwie kannte er manche Attribute nicht. Deshalb in String geparsed und dann zurueck in JSON
  const test = JSON.stringify(unternehmens);
  const aktUnternehmen = JSON.parse(test);


  // >>>>>>> Daten aus UnternehmensJSON
  var shares_outstanding = aktUnternehmen.shares_outstanding.year_2021.q2;
  var EPS = aktUnternehmen.EPS.year_2021.FY;
  var EPS_BEFORE_5_YEARS = aktUnternehmen.EPS.year_2016.FY;
  var revenue = aktUnternehmen.revenue.year_2021.FY;
  var revenue_BEFORE_5_YEARS = aktUnternehmen.revenue.year_2016.FY;
  var shares_to_compute = aktUnternehmen.shares_to_compute.year_2021.q2;
  var shares_to_compute_BEFORE_5_YEARS = aktUnternehmen.shares_to_compute.year_2016.q4;
  var equity = aktUnternehmen.equity.year_2021.q2;
  var net_income = aktUnternehmen.net_income.year_2021.FY;
  var EBIT = aktUnternehmen.EBIT.year_2021.FY;
  var liabilities = aktUnternehmen.liabilities.year_2021.q2;
  var dividend_per_share = aktUnternehmen.dividend_per_share.year_2021.FY;
  var dividend_per_share_BEFORE_5_YEARS = aktUnternehmen.dividend_per_share.year_2016.FY;

  // >>>>>>>> ZWISCHENRECHNUNG
var revenue_per_share = revenue / shares_to_compute;
var revenue_per_share_before_5_years = revenue_BEFORE_5_YEARS / shares_to_compute_BEFORE_5_YEARS;
var five_year_eps_growth = ( Math.pow((EPS / EPS_BEFORE_5_YEARS), 0.2) -1 )  * 100;
var five_year_revenue_growth = ( Math.pow((revenue_per_share / revenue_per_share_before_5_years), 0.2) -1 )  * 100;

var assets = parseInt(liabilities)+parseInt(equity);


 // >>>>>>>>>> Daten f??r das FrontEnd
 //ACHTUNG FALLS WERT 0 IST
 var aktienKurs = data["Global Quote"]["05. price"];
 var change = data["Global Quote"]["09. change"];
 var changePercent = data["Global Quote"]["10. change percent"];
 var marketCap = aktienKurs * shares_outstanding; 
 var kgv = aktienKurs / EPS;
 var kuv = aktienKurs / (revenue_per_share);
 var peg_ratio = kgv / five_year_eps_growth;
 var psg_ratio = kuv / five_year_revenue_growth;
 var pricebook = marketCap / equity;
 var net_margin = net_income / revenue * 100;
 var EBIT_margin = EBIT / revenue * 100;
 var leverage = liabilities / assets * 100;
 var roe = net_income / equity * 100;
 var roa = net_income / assets * 100;
 var dividend_yield = dividend_per_share / aktienKurs * 100;
 var payout_ratio = dividend_per_share / EPS * 100;
 var five_year_dps_growth = ( Math.pow((dividend_per_share / dividend_per_share_BEFORE_5_YEARS), 0.2) -1 )  * 100;

 // Eventuell noch anpassen
 var aktienKursDisplay = aktienKurs * 1;
 var changePercentDisplay = parseFloat(changePercent);
 var colorForChange = Math.sign(changePercentDisplay);


 if (colorForChange > 0) {
  colorForChange = 'green';
} else if (colorForChange < 0) {
  colorForChange = 'red';
} else{
  colorForChange = "blue"
}


 
 calculated_data = {
  "calculated_data": {
    "aktienKurs": aktienKursDisplay.toFixed(2),
    "change": change,
    "changePercent": changePercentDisplay.toFixed(2),
    "colorForChange": colorForChange,
    "marketCap": marketCap,
    "kgv": kgv.toFixed(2),
    "kuv": kuv.toFixed(2),
    "peg_ratio": peg_ratio.toFixed(2),
    "psg_ratio": psg_ratio.toFixed(2),
    "pricebook": pricebook.toFixed(2),
    "net_margin": net_margin.toFixed(2),
    "EBIT_margin": EBIT_margin.toFixed(2),
    "leverage": leverage.toFixed(2),
    "roe": roe.toFixed(2),
    "roa": roa.toFixed(2),
    "dividend_yield": dividend_yield.toFixed(2),
    "payout_ratio": payout_ratio.toFixed(2),
    "five_year_dps_growth" : five_year_dps_growth.toFixed(2)
  }
 }
;
}

function giveColor(colorForChange) {
  let result;

  return result;
}

module.exports = router