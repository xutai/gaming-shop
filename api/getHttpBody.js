exports.getHttpBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = []
        req
            .on('data', (chunk) => {
                // console.info("chunk", chunk)
                body.push(chunk)
            })
            .on('end', () => {
                body = Buffer.concat(body).toString()
                // console.log("body", body)
                resolve(body)
            })
    })

}