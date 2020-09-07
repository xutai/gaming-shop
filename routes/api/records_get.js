const fs = require('fs')
const path = require('path')
const { getUrlSearchParams, postUrlSearchParams } = require('../../api/urlSearchParams')
const connect = require('../../db/connect')
const setHeaderPreset = import('../../mixins/set-header.mjs')
module.exports = (req, res) => {

    let query = {},
        result = ''
        ; (async () => {
            query = await getUrlSearchParams(req)
            result = await connect('pcgames', 'find', query)
            const { setCorsHeaderPreset } = await setHeaderPreset
            await setCorsHeaderPreset(req, res)
            res.writeHead(200, 'read the data successfully!', {
            })
            result = JSON.stringify(result)
            res.end(result)
        })()

}