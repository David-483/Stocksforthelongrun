const { render } = require('ejs')
const express = require('express')
const router = express.Router()

const Searchstuff = require('../models/searchstuff')


router.post('/search',(req,res)=>{
    var dieSuche = req.body.search;
    
//             Unternehmen.find({name:{'$regex':dieSuche , '$options' : 'i'}},{name:1, _id:0},(err,autoData)=>{

    Searchstuff.find({Name:{'$regex':dieSuche , '$options' : 'i'}},{Name:1, Code:1, _id:0},(err,autoData)=>{
               if(err){
                   console.log(err);
               }else{
                    res.json({data:autoData});
               }
    }).limit(4);
  });

  module.exports = router