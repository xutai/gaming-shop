const path = require('path')
const fs = require('fs')
const readFile = require('../scripts/server/common/read-file')
module.exports = (req, res, dir) => {
    ; (async () => {
        const pathSegment = req.url
        const fileName = ''
        const fileExtension = ''
        res.statusCode = 200
        res.statusMessage = '200 OK';
        res.setHeader('Content-Type', 'image/x-ion')
        const data = await readFile(dir, pathSegment, fileName, fileExtension)
        res.end(data)
    })()
}