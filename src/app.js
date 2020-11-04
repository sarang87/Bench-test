const path = require('path')
const express = require('express')
const hbs = require('hbs')
const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



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
    data = fetchAllData()
    res.render('index',
        {
            
            name: 'Created by Sarang Joshi'
        })
})

app.get('/test/json', (req, res) => {
    data = fetchAllData()
    res.json(data)
})


const fetchData = async () => {
    try {
        return await axios.get('https://resttest.bench.co/transactions/1.json')
    } catch (error) {
        if (error.response) {
            console.log("**** ERROR ******")
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
           ``
          } else if (error.request) {
            console.log("**** NETWORK ******")
            // The request was made but no response was received
            console.log(error.request);
          } else {
            console.log("**** OTHER ******")
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
    }
}

const fetchAllData = async () => {
    const fetchedData = await fetchData()
    if (fetchedData) {
        console.log(fetchedData.data)
    }
    else{
        console.log("Fetching error")
    }


}




const PORT = 4001
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})