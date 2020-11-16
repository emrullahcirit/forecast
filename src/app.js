const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Paths according to express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Hava Durumu',
        name: 'Emrullah Cirit'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Bir adres tanımlamanız gerekiyor.'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        message: 'Aradığınız sayfa bulunamadı.',
        name: 'Emrullah Cirit'
    })
})

app.listen(port, ()=>{
    console.log('Server is up and listening on port ' + port)
})