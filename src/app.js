const path = require('path')
const express = require('express')
const hbs = require('hbs')
const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require("cors");
const data = require('./data')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const baseURL = 'https://resttest.bench.co/transactions/'


// Setting up the views
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs')

// Setting up the static assets
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    const startPage = 1
    fetchAllData(startPage).then((response) => {
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



const fetchPageData = async (pageNum) => {
    try {
        let pageURL = pageNum + ".json"
        return await axios.get(baseURL + pageURL)
    } catch (error) {
        if (error.response) {
            console.log("**** ERROR ******")
            // Request made and server responded
            // console.log(error.response.data);
            // console.log(error.response.status);
            return error.response.status
        } else if (!error.response) {
            console.log("**** NETWORK ******")
            // The request was made but no response was received
            //console.log(error.request);
            //console.log(error.request)
            const errMsg = "Network error"
            return errMsg

        } else {
            console.log("**** OTHER ******")
            return error.message
        }
    }
}

const fetchAllData = async (page) => {
    let response = await fetchPageData(page)
    let resultData = {}
    let pageResults = []
    if (response.status != 200) {
        return response
    }
    flag = true
    while (flag) {
        let response = await fetchPageData(page)
        if (response.status == 200) {
            pageResults.push(...response.data.transactions)
            //console.log(response.data)
        }
        else {
            flag = false
        }
        page = page + 1
    }
    console.log(pageResults)
    resultData['transactions'] = pageResults
    return resultData
}


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT)
})