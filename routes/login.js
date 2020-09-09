const path = require('path')
const fs = require('fs')
const readFile = require('../scripts/server/common/read-file')
const checkAuthorization = require('../modules/checkAuthorization')
const concatenateHtml = require('../modules/concatenateHtml')
module.exports = (req, res, dir) => {

    const next = async () => {
        const pathSegment = '/pages/'
        const fileName = 'login'
        const fileExtension = 'html'
        // const data = await readFile(dir, pathSegment, fileName, fileExtension)
        const html = await concatenateHtml(dir, pathSegment, fileName, fileExtension)
        res.end(html)
    }

    // ???
    if (req.url !== '/login') {
        (async () => {
            const status = await checkAuthorization(req, res)
            switch (status) {
                case '200':
                    next()
                    break;
                case '401':
                    break;
                default:
                    break;
            }

        })()

    } else next()

}