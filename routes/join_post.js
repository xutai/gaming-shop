const fs = require('fs')
const path = require('path')
const { getUrlSearchParams, postUrlSearchParams } = require('../api/urlSearchParams')
const connect = require('../db/connect')
const setHeaderPresetPromise = import('../mixins/set-header.mjs')
const setCookieObj = import('../mixins/set-cookie.mjs')
module.exports = (req, res, body) => {
    let query,
        result;

    ; (async () => {
        console.info(__filename)
        query = await postUrlSearchParams(req, body)
        // console.info(
        //     "query",query
        // )
        result = await connect('user', 'insertOne', query)
        if (result === 'username found') {
            // result = JSON.stringify(result)
            result = 'username found'
            res.writeHead(200, 'OK', {})
            res.end(result)
        } else {
            if (result.insertedCount === 1) {
                result = 'record created'
                const { setHeaderPreset } = await setHeaderPresetPromise
                setHeaderPreset(req, res)
                const { setCookiePreset } = await setCookieObj
                res.setHeader(
                    'Set-Cookie', setCookiePreset(query)
                )
                res.writeHead(201, 'Created', {})
                res.end(result)
            } else {
                result = 'failed to create record'
                res.writeHead(200, 'OK', {})
                res.end(result)
            }
        }
    })()




}