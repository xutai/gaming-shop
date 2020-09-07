const fs = require('fs')
const path = require('path')
const { getUrlSearchParams, postUrlSearchParams } = require('../api/urlSearchParams')
const connect = require('../db/connect')
module.exports = (req, res) => {
    let query;

    ; (async () => {
        query = await postUrlSearchParams(req)
        await connect('pcgames', 'updateOne', query)
        res.writeHead(302, 'I should redirect you to the previous page', {
            location: '/create'
        })
        res.end()
    })()

}