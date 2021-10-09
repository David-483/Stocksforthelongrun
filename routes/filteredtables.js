const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const filteredtables = require('../models/filteredtable')
const Unternehmen = require('../models/unternehmen')


//Get alle Einträge Route
router.get('/', async (req, res) => {
    try {
      const unternehmens = await Unternehmen.find({})
      //res.json(unternehmens)
      res.render('filteredtables/index', {unternehmen: unternehmens})
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

//Get einen
router.get('/:category', async (req, res) => {
  try {
    const unternehmens = await Unternehmen.find({category: req.params.category})
    //res.json(unternehmens)
    res.render('filteredtables/index', {unternehmen: unternehmens})
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/*
router.get('/:category', getUnternehmen, (req, res) => {
  unternehmen = await Unternehmen.find({category: req.params.category})
    res.render('filteredtables/index', {unternehmen: unternehmen})
  })
*/


// Erstellen
router.post('/', async(req,res) => {
    const unternehmen = new Unternehmen({
        name: req.body.name,
        umsatz: req.body.umsatz,
        category : req.body.category
    })
    try{
        const newUnternehmen = await unternehmen.save()
        res.status(201).json(newUnternehmen)
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

async function getUnternehmen(req, res, next) {
    let unternehmen
    try {
        unternehmen = await Unternehmen.find({category: req.params.category})
      if (unternehmen == null) {
        return res.status(404).json({ message: 'Cannot find subscriber' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.unternehmen = unternehmen
    next()
  }

    router.post('/auto',(req,res)=>{
      var dieSuche = req.body.auto;
      
 //             Unternehmen.find({name:{'$regex':dieSuche , '$options' : 'i'}},{name:1, _id:0},(err,autoData)=>{
        Unternehmen.find({
          $and: [ 
            {name:{'$regex':dieSuche , '$options' : 'i'}},
            {searchable: '1'}
          ]},
              (err,autoData)=>{
                 if(err){
                     console.log(err);
                 }else{
                     res.json({data:autoData});
                 }
      }).limit(2).select('name category');
    });



module.exports = router