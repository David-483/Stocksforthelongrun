const { render } = require('ejs')
const express = require('express')
const router = express.Router()

//All Authors Route
router.get('/', (req, res) =>{
    res.render('dashboard/index')
})



module.exports = router