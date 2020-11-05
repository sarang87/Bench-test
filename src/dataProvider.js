const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const baseURL = process.env.BASE_URL

// Get the data for a requested pagenumber from the API
const fetchPageData = async (pageNum) => {
    try {
        let pageURL = pageNum + ".json"
        return await axios.get(baseURL + pageURL)
    } catch (error) {
        // Request made and server responded
        if (error.response) {
            return error.response.status
        }
        // The request was made but no response was received 
        else if (!error.response) {
            const errMsg = "Network error"
            return errMsg
            // Other issue
        } else {
            return error.message
        }
    }
}

// Get the data for all pages from the API
const fetchAllData = async (page) => {
    let response = await fetchPageData(page)
    let resultData = {}
    let pageResults = []
    // return error response incase statuis is not OK
    if (response.status != 200) {
        return response
    }
    flag = true
    // request till valid data is being fetched
    while (flag) {
        response = await fetchPageData(page)
        if (response.status == 200) {
            pageResults.push(...response.data.transactions)
        }
        else {
            flag = false
        }
        page = page + 1
    }
    resultData['transactions'] = pageResults
    return resultData
}

module.exports = {
    fetchAllData: fetchAllData,
    fetchPageData: fetchPageData
}