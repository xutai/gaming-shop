const path = require('path')
const fs = require('fs')
const readFile = require('../scripts/server/common/read-file')
module.exports = (req, res, dir) => {

    console.log(
        "req.url:", req.url,
        "no route matched!"
    )

    const pathSegment = '/pages/'
    const fileName = '404'
    const fileExtension = 'html'

    res.statusCode = 404
    res.statusMessage = '404 not found';
    res.setHeader('Content-Type', 'text/html')
        ; (async () => {
            const data = await readFile(dir, pathSegment, fileName, fileExtension)
            res.end(data)
        })()

    // const newPath = path.resolve(dir, 'index.html')
    // readFile(newPath)
}


