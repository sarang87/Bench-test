const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cors = require("cors");
const dataProvider = require('./dataProvider')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
app.use(cors());


// Setting up the views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs')

const startPage = 1

// Setting up the static assets
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// Get all the data from the third party API for all the pages
app.get('/', (req, res) => {
   
    dataProvider.fetchAllData(startPage).then((response) => {
        // response data has valid transactions
        if (response.transactions) {
            res.render('index',
                { transactions: response.transactions })
        }
        // render error page with a message
        else {
            res.render('errorPage', { error: response })
        }
    })
})


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT)
})