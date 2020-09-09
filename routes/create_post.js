const fs = require('fs')
const path = require('path')
const { getUrlSearchParams, postUrlSearchParams } = require('../api/urlSearchParams')
const connect = require('../db/connect')
module.exports = (req, res, body) => {
    let query,
        result;

    ; (async () => {
        query = await postUrlSearchParams(req, body)
        result = await connect('pcgames', 'insertOne', query)
        console.trace("result", result)
        if (result === 'game record found') {
            // result = JSON.stringify(result)
            res.writeHead(200, 'OK', {})
            result = 'game record found'
            res.end(result)
        } else {
            if (result.insertedCount === 1) {
                // const { setHeaderPreset } = await setHeaderPresetPromise
                // setHeaderPreset(req, res)
                // const { setCookiePreset } = await setCookieObj
                // res.setHeader(
                    // 'Set-Cookie', setCookiePreset(query)
                // )
                res.writeHead(201, 'Created', {})
                result = 'record created'
                // res.writeHead(302, 'I should redirect you to the previous page', {
                //     location: '/create'
                // })
                res.end(result)
            } else {
                res.writeHead(200, 'OK', {})
                result = 'failed to create record'
                res.end(result)
            }
        }
    })()


}