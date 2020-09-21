// const whitelistOrigins = require('../config/whitelistOrigins.js')
import { whitelistOrigins } from '../config/whitelistOrigins.mjs'

const setHeaderPreset = (req, res, data = 'preflight not allowed') => {
    console.info("req.headers.origin", req.headers.origin)
    if (whitelistOrigins.includes(req.headers.origin)) {
        res.setHeader('access-control-allow-origin', req.headers.origin)
        res.setHeader('vary', 'origin')
        res.setHeader('access-control-allow-credentials', true)
        // case sensitive
        res.setHeader('access-control-allow-methods', 'POST, GET, OPTIONS')
        res.setHeader('access-control-allow-headers', 'framework-i-use, Content-Type')
        res.setHeader('Access-Control-Max-Age', 86400)
        console.trace("res.headers", res.headers)
    } else {
        res.end(data)
    }
}
const setCorsHeaderPreset = (req, res, data = 'preflight not allowed') => {
    console.info("req.headers.origin", req.headers.origin)
    if (whitelistOrigins.includes(req.headers.origin)) {
        res.setHeader('access-control-allow-origin', req.headers.origin)
        res.setHeader('vary', 'origin')
        res.setHeader('access-control-allow-credentials', true)
        // case sensitive
        res.setHeader('access-control-allow-methods', 'POST, GET, OPTIONS')
        res.setHeader('access-control-allow-headers', 'framework-i-use, Content-Type')
        res.setHeader('Access-Control-Max-Age', 86400)
    } 
}

export { setHeaderPreset, setCorsHeaderPreset  }
