const fs = require('fs')
const path = require('path')
const { getUrlSearchParams, postUrlSearchParams } = require('../api/urlSearchParams')
const { parseFormData } = require('../api/formData')
const connect = require('../db/connect')
const setHeaderPresetPromise = import('../mixins/set-header.mjs')
const setCookieObj = import('../mixins/set-cookie.mjs')
module.exports = (req, res, body) => {
    let query,
        result;

    ; (async () => {
        query = await parseFormData(req, body)
        // console.info(
        //     "query",query
        // )
        result = await connect('user', 'updateOne', query)
        console.log("login_patch.js result:", result)
        if (result === 'username or password not correct') {
            // result = JSON.stringify(result)
            res.writeHead(200, 'OK', {})
            result = 'username or password not correct'
            res.end(result)
        } else {
            if (result.modifiedCount === 1) {
                const { setHeaderPreset } = await setHeaderPresetPromise
                await setHeaderPreset(req, res)
                console.log("res.getHeaders()",res.getHeaders())
                const { setCookiePreset } = await setCookieObj
                console.log("setCookiePreset", setCookiePreset)
                res.setHeader(
                    'Set-Cookie', await setCookiePreset(query)
                )
                console.info(
                    "login_patch.js",
                    "res.getHeaders()",res.getHeaders(),
                    // "res.getHeaders().cookie", res.getHeaders().cookie
                )
                res.writeHead(201, 'Created', {})
                result = 'record updated'
                res.end(result)
            } else {
                res.writeHead(200, 'OK', {})
                result = 'failed to updated record'
                res.end(result)
            }
        }
    })()




}