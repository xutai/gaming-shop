const path = require('path')
const fs = require('fs')
const concatenateHtml = require('../modules/concatenateHtml')
const checkAuthorization = require('../modules/checkAuthorization')
const generateGamelist = require('../modules/generateGamelist')
module.exports = (req, res, dir) => {

    const next = async () => {
        const pathSegment = '/'
        const fileName = 'index'
        const fileExtension = 'html'
        const customGamelist = await generateGamelist()
        // console.info(customGamelist)
        const html = await concatenateHtml(dir, pathSegment, fileName, fileExtension, customGamelist)
        res.end(html)
    }

    (async () => {
        // await checkAuthorization(req, res)
        next()
    })()



}