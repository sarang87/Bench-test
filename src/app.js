const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')

// Setting up the views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs')

// Setting up the static assets
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',
        {
            title: 'Currency chart',
            name: 'Created by Sarang Joshi'
        })
})

app.get('/help', (req, res) => {
    res.render('help',
        {
            Contact: 'Sarang Joshi'
        })
})

app.get('/about', (req, res) => {
    res.render('about')
})



const PORT = 4000
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})