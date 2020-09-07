module.exports = (server) => {
    server.on('http server on checkContinue', (req, res) => {
        console.log('http server on checkContinue')
    })

    server.on('http server on checkExpectation', (req, res) => {
        console.log('http server on checkExpectation')
    })

    server.on('http server on clientError', (err, socket) => {
        console.log('http server on clientError')
    })

    server.on('http server on close', () => {
        console.log('http server on close')
    })

    server.on('http server on connect', (req, socket, head) => {
        console.log('http server on connect')
    })

    server.on('http server on connection', (socket) => {
        console.log('http server on connection')
    })

    server.on('http server on request', (req, res) => {
        console.log('http server on request')
    })

    server.on('http server on upgrade', (req, socket, head) => {
        console.log('http server on upgrade')
    })

    // console.log("server.listening:", server.listening)

    // console.log("server.maxHeadersCount:", server.maxHeadersCount)
    // console.log("server.headersTimeout:", server.headersTimeout)
    // console.log("server.timeout:", server.timeout)
    // console.log("server.keepAliveTimeout:", server.keepAliveTimeout)
    // console.log("server.listening:", server.listening)

}