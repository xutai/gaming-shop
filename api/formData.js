// const { getHttpBody } = require('./getHttpBody')
const busboy = require('./third-party/busboy')
exports.parseFormData = (req) => {
    return new Promise((resolve, reject) => {
        busboy(req)
            .then(body => {
                // const url = new URL(body, 'http://localhost:8082/')
                // whatwg
                const query = new URLSearchParams(body)
                console.log("query:", query)
                resolve(query)
            })
            .catch(e => console.error(e))
            .finally(() => { })
    })
}