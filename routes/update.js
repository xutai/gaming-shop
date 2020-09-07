const path = require('path')
const fs = require('fs')
const readFile = require('../scripts/server/common/read-file')
const checkAuthorization = require('../modules/checkAuthorization')
const concatenateHtml = require('../modules/concatenateHtml')
module.exports = (req, res, dir) => {

    const next = async () => {
        let pathSegment = '/pages/crud/'
        let fileName = 'update'
        let fileExtension = 'html'

        const html = await concatenateHtml(dir, pathSegment, fileName, fileExtension)

        res.end(html)
    }
    
    (async () => {
        // await checkAuthorization(req, res)
        await next()
    })()



}