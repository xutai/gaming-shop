const fs = require('fs')
const path = require('path')
const { getUrlSearchParams, postUrlSearchParams } = require('../api/urlSearchParams')
const connect = require('../db/connect')
module.exports = (req, res, body) => {
    let query;
    ; (async () => {
        query = await postUrlSearchParams(req, body)
        const result = await connect('pcgames', 'updateOne', query)
        console.log(__filename, "result", result)
        res.writeHead(204, 'No Content', {
            // location: '/create'
        })
        res.end()
    })()

}