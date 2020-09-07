const fs = require('fs')
const path = require('path')
const { getUrlSearchParams, postUrlSearchParams } = require('../api/urlSearchParams')
const connect = require('../db/connect')
module.exports = (req, res) => {

    let query = {},
        result = ''
        ; (async () => {
            query = await getUrlSearchParams(req)
            result = await connect('pcgames', 'findOne', query)
            console.log("result", result)
            res.writeHead(200, 'read the data successfully!', {
            })
            result = JSON.stringify(result)
            res.end(result)
        })()
}