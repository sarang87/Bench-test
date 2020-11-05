const path = require('path')
const express = require('express')
const hbs = require('hbs')
const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require("cors");
const data = require('./data')
const app = express()

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
    fetchAllData().then((response) => {
        if (response.data) {
            res.render('index',
                { transactions: response.data.transactions })
        }
        else {
            res.render('errorPage', { error: response })
        }
    })
})



const fetchPageData = async (pageNum) => {
    try {
        let pageURL = pageNum+".json"
        return await axios.get(baseURL+pageURL)
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
            const errMsg = "Network error"
            return errMsg

        } else {
            console.log("**** OTHER ******")
            // Something happened in setting up the request that triggered an Error
            //console.log('Error', error.message);
            return error.message
        }
    }
}

const fetchAllData = async () => {
    const fetchedData = await fetchPageData(2)
    console.log(fetchedData)
    if (fetchedData.status == 200) {
        //console.log(fetchedData.data.transactions)
        return fetchedData
    }
    else {
        console.log("Fetching error")
    }
}



const PORT = 4001
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})