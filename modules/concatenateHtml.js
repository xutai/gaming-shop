const readFile = require('../scripts/server/common/read-file')
module.exports = (dir, pathSegment, fileName, fileExtension, custom) => {
    return new Promise((resolve, reject) => {
        ; (async () => {
            let head,
                bodyStart,
                template,
                bodyEnd,
                foot,
                html,
                headFileName = 'head',
                bodyStartFileName = 'body-start',
                bodyEndFileName = 'body-end',
                footFileName = 'foot',
                templatePathSegment = '/pages/template/'

            head = await readFile(dir, templatePathSegment, headFileName, fileExtension)
            bodyStart = await readFile(dir, templatePathSegment, bodyStartFileName, fileExtension)
            bodyEnd = await readFile(dir, templatePathSegment, bodyEndFileName, fileExtension)
            foot = await readFile(dir, templatePathSegment, footFileName, fileExtension)
            template = await readFile(dir, pathSegment, fileName, fileExtension)
            custom = custom || ''
            html =
                `
            ${head}
            ${bodyStart}
            ${template}
            ${custom}
            ${bodyEnd}
            ${foot}
            
            `
            resolve(html)
        })()
    })

}



// promise based
/*
      const promise = new Promise((resolve, reject) => {
            fs.readFile(path.resolve(__dirname, '../../../pages/template/gaming/head.html'), {
                encoding: 'utf-8',
                flag: 'r'
            }, (err, data) => {
                if (err) throw err
                resolve(data)
            })
        })
        promise
            .then((data) => {
                header = data
                return new Promise((resolve, reject) => {
                    fs.readFile(path.resolve(__dirname, '../../../pages/template/gaming/foot.html'), {
                        encoding: 'utf-8',
                        flag: 'r'
                    }, (err, data) => {
                        if (err) throw err
                        resolve(data)
                    })
                })
            })
            .then((data) => {
                footer = data
                return new Promise((resolve, reject) => {
                    resolve()
                })
            })
            .then(() => {
                html = buildHtml(header, body, footer)
                // html = buildHtml('', body, '', false)
                res.setHeader('access-control-allow-origin', allowedOrigins[0])
                res.setHeader('vary', 'origin')
                res.end(html)
            })
    }
*/