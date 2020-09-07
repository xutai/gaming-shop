const fs = require('fs')
const path = require('path')
const { getUrlSearchParams, postUrlSearchParams } = require('../api/urlSearchParams')
const connect = require('../db/connect')
module.exports = (req, res) => {

    let query = {},
        result = ''
        ; (async () => {
            query = await getUrlSearchParams(req)
            console.info("query",query)
            result = await connect('pcgames','deleteOne', query )
            res.writeHead(200, 'OK', {
            })
            result = JSON.stringify(result)
            result += `
202 Accepted  if the action will likely succeed but has not yet been enacted.
204 No Content if the action has been enacted and no further information is to be supplied
200 OK if the action has been enacted and the response message includes a representation describing the status
            `
            res.end(result)
        })()
}