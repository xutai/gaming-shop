const http = require('http')
const path = require('path')
const querystring = require('querystring')
const assesrt = require('assert')
const href = require('./config/href')
const newClassNetSocket = require('./api/net-class-net-socket')
const httpClassHttpServer = require('./api/http-class-http-server')
const httpClassHttpInComingMessage = require('./api/http-class-http-inComingMessage')
const routes = require('./routes')
const editing_games_submitted = require('./scripts/server/gaming/editing_games_submitted')
const server = http.createServer()
server.on('request', (req, res) => {

    httpClassHttpInComingMessage(req)

    const body = newClassNetSocket(req)
    // WHATWG
    const url = new URL(req.url, 'http://localhost:8082/')
    const pathname = url.pathname
    const dir = __dirname

    console.log(
        // req.headers,
        // new Date(),
        "pathname",pathname
    )
    if ((pathname === '/') || (pathname === '/index')) {
        routes(req, res, dir, 'home')
    }
    else if (pathname === '/favicon.ico') {
        routes(req, res, dir, 'images')
    }
    else if (pathname === '/login') {
        routes(req, res, dir, 'login')
    }
    else if (pathname === '/join') {
        routes(req, res, dir, 'join')
    }
    else if (pathname === '/create') {
        routes(req, res, dir, 'create')
    }
    else if (pathname === '/read') {
        routes(req, res, dir, 'read')
    }
    else if (pathname === '/update') {
        routes(req, res, dir, 'update')
    }
    else if (pathname === '/delete') {
        routes(req, res, dir, 'delete')
    }
    else if (pathname === '/records') {
        routes(req, res, dir, 'api/records')
    }
    else if (/^\/scripts/.test(url.pathname)) {
        const static = require('./scripts/server/common/static')
        static(req, 'scripts', url.pathname, res, dir)
    }
    else {
        routes(req, res, dir, 'not-found')
    }
})

httpClassHttpServer(server)

const { host, port } = href
server.listen(port, () => {
    console.log(
        `server is running, address is ${host}:${port}`
    )
})






