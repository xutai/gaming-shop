// const { routesPathname } = require('./config/routes')
const checkAccessToken = require('./routing/check-access-token')
const checkLoginToken = require('./routing/check-login-token')
const apiRoutes = ['/records']
const { getHttpBody } = require('./api/getHttpBody')
const hrefs = require('./config/hrefs.js')

const redirectTo = (res, route) => {
    res.statusCode = 302
    res.statusMessage = 'found'
    res.setHeader('location', `${route}`)
    res.end()
}

const forbiddenAccess = (res) => {
    res.statusCode = 403
    res.statusMessage = 'Forbidden'
    res.end()
}

const notFound = (res) => {
    res.statusCode = 404
    res.statusMessage = 'Forbidden'
    res.end()
}

const methodNotAllowed = (res) => {
    res.statusCode = 405
    res.statusMessage = 'Method Not Allowed'
    res.end()
}

module.exports = (req, res, dir, routeName) => {
    // routeName = routesPathname[routeName][1]
    let body
    if (req.url.method !== 'GET'){
         body = getHttpBody(req)
    }
    let routing = undefined
    let isQuery = false
    let hasAccessPermission = false
    let isLoginValid = false
    let regexp = /\?+/
    if (regexp.test(req.url)) isQuery = true
    const url = new URL(req.url, hrefs.remote)

    console.log(
        req.url,
        req.method,
        req.headers.origin
    )
        ; (async () => {
            if (req.url === '/') {
                isLoginValid = await checkLoginToken(req)
                if (isLoginValid) {
                    routing = require(`./routes/${routeName}`)
                    routing(req, res, dir)
                } else {
                    redirectTo(res, '/login')
                }
            } else if (req.url === '/login' || req.url === '/join') {
                switch (req.method) {
                    case 'GET':
                        isLoginValid = await checkLoginToken(req)
                        console.info(
                            "isLoginValid", isLoginValid
                        )
                        if (isLoginValid) {
                            redirectTo(res, '/')
                        } else {
                            if (isQuery) {
                                routing = require(`./routes/${routeName}_get`)
                                routing(req, res)
                            } else {
                                routing = require(`./routes/${routeName}`)
                                routing(req, res, dir)
                            }
                        }
                        break;
                    case 'POST':
                        routing = require(`./routes/${routeName}_post`)
                        routing(req, res, dir)
                        break;
                    case 'PATCH':
                        routing = require(`./routes/${routeName}_patch`)
                        routing(req, res, dir)
                        break;
                    default:
                        methodNotAllowed()
                        break;
                }


            }
            else {
                if (!apiRoutes.includes(url.pathname)) {
                    hasAccessPermission = await checkAccessToken(req)
                } else {
                    hasAccessPermission = true
                }
                if (!hasAccessPermission) {
                    forbiddenAccess(res)
                } else {
                    switch (req.method) {
                        case 'GET':
                            switch (isQuery) {
                                case true:
                                    routing = require(`./routes/${routeName}_get`)
                                    routing(req, res)
                                    break;
                                case false:
                                    routing = require(`./routes/${routeName}`)
                                    routing(req, res, dir)
                                    break;
                                default:
                                    throw new Error('routes.js! you should never reach this default case in switch statement.')
                            }
                            break;
                        case 'POST':
                            routing = require(`./routes/${routeName}_post`)
                            routing(req, res, body)
                            break;
                        case 'DELETE':
                            routing = require(`./routes/${routeName}_delete`)
                            routing(req, res)
                            break;
                        case 'PATCH':
                            routing = require(`./routes/${routeName}_patch`)
                            routing(req, res, body)
                            break;
                        case 'PUT':
                            routing = require(`./routes/${routeName}_put`)
                            routing(req, res)
                            break;

                    }
                }
            }
        })()







}


