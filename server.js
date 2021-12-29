if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

const filteredtablesRouter = require('./routes/filteredtables')
const dashboardRouter = require('./routes/dashboard')

const gurusRouter = require('./routes/gurus')

const dashboard2Router = require('./routes/dashboard2')

const analysenRouter = require('./routes/analysen')


app.set('view engine', 'ejs')

var path = require ('path');
app.use(express.static(path.join(__dirname + '/views')));

app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));


app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true })
    const db = mongoose.connection
    db.on('error', error => console.error(error))
    db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/filteredtables', filteredtablesRouter)
app.use('/dashboard', dashboardRouter)
app.use('/dashboard2', dashboard2Router)
app.use('/gurus', gurusRouter)
app.use('/analysen', analysenRouter)


app.use(express.json())


app.listen(process.env.PORT || 3000)
