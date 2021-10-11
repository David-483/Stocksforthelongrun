const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const Unternehmen = require('../models/unternehmen')


//All Authors Route
router.get('/', (req, res) =>{
    res.render('dashboard/index')
})


router.get('/:ticker', async (req, res) => {
  try{ 
//             Unternehmen.find({name:{'$regex':dieSuche , '$options' : 'i'}},{name:1, _id:0},(err,autoData)=>{
  const unternehmens = await Unternehmen.findOne({
      $and: [ 
  //      {"company_data.foundingyear":{'$regex':dieSuche } , '$options' : 'i'},
        {
          'company_data.ticker':{'$regex':req.params.ticker , '$options' : 'i'}},
        {searchable: { $exists:false}},
      ]},
      /*
          (err,autoData)=>{
             if(err){
                 console.log(err);
             }else{
              res.render('dashboard/index', {unternehmen: unternehmens})
             } }
             */
 ).select('-_id');
 //res.json(unternehmens)
 if(unternehmens == null){
  res.render('index')
 }else{
    res.render('dashboard/index', {unternehmen: unternehmens})
 }
}
catch (err){
  res.status(500).json({ message: err.message })
            }
});



module.exports = router