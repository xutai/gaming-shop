const path = require('path')
const fs = require('fs')

module.exports = (req, res, rootDir, pathname) => {
    const url = require('url').parse(req.url)
    let urlsArray = [
        "/pages/gaming/pcgames/",
        "/pages/gaming/to_save_games",
    "/pages/gaming/to_find_games",
        "/pages/gaming/gamelist"
    ]
    if (!urlsArray.includes(pathname)) {

        let newData = ''
        fs.readFile(path.resolve(rootDir, './pages/template/head.html'), (err, data) => {
            if (err) throw err
            newData += data

            const folder = 'pages/gaming'
            const pathname = url.pathname
            if (pathname.indexOf('/' + folder) === 0) {

                let filePath;
                if (/\/$/.test(url.pathname)) {
                    filePath = path.join(rootDir, pathname + 'index.html')
                    filePath = decodeURIComponent(filePath)
                } else {
                    filePath = path.join(rootDir, pathname + '.html')
                    filePath = decodeURIComponent(filePath)
                }

                fs.readFile(filePath, (err, data) => {
                    if (err) {
                        res.writeHead(404, {
                            // 'Content-Length': Buffer.byteLength(body),
                            // 'Content-Type': 'text/plain'
                        })
                        res.end('static.js, no such file');
                    }
                    newData += data

                    fs.readFile(path.resolve(rootDir, './pages/template/foot.html'), (err, data) => {
                        if (err) throw err
                        res.setHeader(
                            'Set-Cookie',
                            [
                                'pages=gaming',
                                'gaing=' + url.pathname + '; Expires=Wednesday, 15 July 2020 13:22:00 GMT;'
                            ]
                        );
                        newData += data
                        res.end(newData, 'utf-8', () => {
                            console.log(`${url.pathname} sent`)
                        })
                    })
                })
            }
        })
    } else {
        const crudXhr = require('./crud-xhr')
        crudXhr(req, res)
        
        const crudHtml = require('./crud-html')
        crudHtml(req, res)
    }
}