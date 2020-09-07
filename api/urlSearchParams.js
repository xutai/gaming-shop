const querystring = require('querystring')
const path = require('path')
const { URL, URLSearchParams } = require('url')
const { getHttpBody } = require('./getHttpBody')
exports.getUrlSearchParams = (req) => {
    return new Promise((resolve, reject) => {
        const url = new URL(req.url, 'http://localhost:8082/')
        // whatwg
        const query = url.searchParams
        resolve(query)
    })
}

console.info(__filename)

exports.postUrlSearchParams = (req, body) => {
    return new Promise(
        (resolve, reject) => {
            // Promise.resolve(getHttpBody(req))
            Promise.resolve(body)
                .then(body => {
                    // const url = new URL(body, 'http://localhost:8082/')
                    // whatwg
                    const query = new URLSearchParams(body)
                    console.log("body:", body)
                    console.log("query:", query)
                    resolve(query)
                })
        })
}

// legacy
// const url = require('url').parse(req.url)
// const query = querystring.parse(url.query, "&", "=", {
//     decodeURIComponent: querystring.unescape(),
//     maxKeys: 1000
// })