const dbQueryCredentials = require('./dbQueryCredentials')
module.exports = (req, res) => {
    return new Promise((resolve1, reject1) => {
        let auth = req.headers['authorization']
        if (auth && auth.indexOf('Basic') !== -1) {
            auth = auth.replace('Basic', '')
            auth = auth.replace(/\=/g, '')
            const buffer = Buffer.from(auth, 'base64')
            const str = buffer.toString('utf-8')
            console.warn(auth, str)
            const arr = str.split(':')
            const username = arr[0]
            const password = arr[1]
    
            const promise = new Promise((resolve, reject) => {
                resolve(dbQueryCredentials(username, password))
            })
                .then((record) => {
                    next(record)
                })
                .catch(err => console.error(err))
    
            const next = (record) => {
                if (username === record.username && password === record.password) {
                    res.statusCode = 200
                    res.statusMessage = 'ok'
                    res.setHeader('Content-Type', 'text/html')
                    resolve1('200')
                } else {
                    res.statusCode = 401
                    res.statusMessage = 'Unauthorized'
                    res.setHeader('WWW-Authenticate', 'Basic real="Access to the staging site"')
                    res.setHeader('Content-Type', 'text/plain')
                    res.end('401 Unauthorized')
                    resolve1('401')
                }
            }
    
    
        } else {
            // console.warn(decoder.write(req.headers['authorization']))
            // console.log(atob(req.headers['authorization']))
            res.statusCode = 401
            res.statusMessage = 'Unauthorized'
            res.setHeader('WWW-Authenticate', 'Basic real="Access to the staging site"')
            res.setHeader('Content-Type', 'text/plain')
            res.end('401 Unauthorized')
            resolve1('401')
        }
    })





}

