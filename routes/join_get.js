const fs = require('fs')
const path = require('path')
const { getUrlSearchParams, postUrlSearchParams } = require('../api/urlSearchParams')
const connect = require('../db/connect')
const { resolve } = require('path')
const setHeaderPresetPromise = import('../mixins/set-header.mjs')
const setCookieObj = import('../mixins/set-cookie.mjs')
module.exports = (req, res) => {
    let query,
        result;

    ; (async () => {
        // console.info(__filename)
        query = await getUrlSearchParams(req)
        // console.info(
        //     "query",query
        // )
        result = await connect('user', 'findOne', query)
        const { record: record } = result
        // console.info(
        //     "result", result
        // )
        const handler = {
            has(target, key) {
                return key in target
            }
        }
        const proxy = new Proxy(record, handler)
        if ('_id' in proxy) {
            result = 'username found'

        } else {
            result = 'username not found'
        }
        res.writeHead(200, 'OK', {})
        res.end(result)
    })()




}