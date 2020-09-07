const fs = require('fs')
const path = require('path')
const { getUrlSearchParams, postUrlSearchParams } = require('../api/urlSearchParams')
const connect = require('../db/connect')
module.exports = (req, res) => {

    let query = {},
        theOne = ''
        ; (async () => {
            query = await getUrlSearchParams(req)
            theOne = await connect('pcgames', 'findOne', query)
            res.writeHead(200, 'read the data successfully!', {
            })
            theOne = JSON.stringify(theOne)
            res.end(theOne)
        })()



}