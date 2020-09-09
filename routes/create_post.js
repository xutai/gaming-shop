const fs = require('fs')
const path = require('path')
const { getUrlSearchParams, postUrlSearchParams } = require('../api/urlSearchParams')
const connect = require('../db/connect')
module.exports = (req, res, body) => {
    let query;

        ; (async () => {
            query = await postUrlSearchParams(req, body)
            await connect('pcgames','insertOne',query)
            res.writeHead(302, 'I should redirect you to the previous page', {
                location: '/create'
            })
            res.end()
        })()


}