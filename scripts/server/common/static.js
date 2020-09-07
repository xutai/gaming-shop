
/* test
const url = 'js/home.js'

module.exports = {
    url
}
*/

/*
思路：
static(文件夹名)
读取文件夹里面的每一个文件，然后套一下模式
*/

/*
else if (url.pathname === '/css/home.css') {
        fs.readFile(path.resolve(__dirname, 'css/home.css'), (err, data) => {
            if (err) throw err
            res.end(data)
        })
    } else if (url.pathname === '/js/home.js') {
        fs.readFile(path.resolve(__dirname, 'js/home.js'), (err, data) => {
            if (err) throw err
            res.end(data)
        })
    }
    */

   const fs = require('fs')
   const path = require('path')
   const whitelistOrigins = require('../config/whitelistOrigins.js')
   module.exports = (req, folder, pathname, res, rootDir) => {
       // console.log("folder, pathname, , rootDir: ", folder, pathname, rootDir)
   
       if (pathname.indexOf('/' + folder) === 0) {
           // console.log(pathname)
           //   pathname: '/styles/common.css',
   
           // console.log("static.js __dirname: ", __dirname)
           // D:\github\moonlight\module
   
           //  console.log(path.relative(__dirname, '../js'))
           //  console.log(path.parse(__dirname))
           //  console.log(path.dirname(__dirname))
           // const pathObj = path.parse(rootDir)
           // console.log("static.js pathObj.dir", pathObj.dir)
           // const thePath = path.resolve(pathObj.dir, folder)
           // console.log(thePath, pathname)
   
           //  console.log(pathname)
   
           // const filePath = path.relative(pathObj.dir, pathname)
           // console.log(path.parse(pathname))
           // const filePath = path.resolve(pathObj.dir, '.' + pathname)
           // console.log(rootDir, pathname)
           // const filePath = path.resolve(rootDir,  pathname)
           const filePath = path.join(rootDir, pathname)
           // console.log('static.js, filePath', filePath)
   
           if (req.method === 'POST') {
               let body = []
               req.on('error', (err) => {
                   console.error(err)
               })
                   .on('data', chunk => {
                       console.log(`Data chunk available: ${chunk}`);
                       body.push(chunk);
                   })
                   .on('end', () => {
                       body = Buffer.concat(body).toString()
                       console.log("body", body)
                       let obj = JSON.parse(body)
                       console.log("req.rawHeaders", req.rawHeaders)
                       console.log("req.trailers", req.trailers)
   
                       // fs.write()
                       fs.readFile(filePath, {
                           encoding: 'utf-8',
                           flag: 'r'
                       }, (err, data) => {
                           if (err) throw err
                           console.log('file read successfully!')
                           data = data.replace(']', '')
                           console.log("data1", data)
                           data += ','
                           data += body
                           data += ']'
                           console.log("data2", data)
   
                           fs.writeFile(filePath, data, {
                               encoding: 'utf-8',
                               mode: 0o666,
                               flag: 'w'
                           }, (err) => {
                               if (err) throw err;
                               console.log('file written successfully!')
   
                               res.statusCode = 201
                               res.statusMessage = 'created'
                               res.setHeader('keep-alive', 'timeout=5, max=1000')
                               res.setHeader('set-cookie', [
                                   `username=${obj.username}; Expires=Fri, 30 July 2020 13:22:00 GMT; path=/; samesite=lax`,
                                   // `password=${obj.password}; Expires=Tue, 30 July 2020 14:41:44 GMT; path=/; HttpOnly`,
                                   `loginToken=${obj.password}; Expires=Fri, 30 July 2020 14:41:44 GMT; path=/; HttpOnly;samesite=lax`,
                                   // `password=${obj.password}; Expires=Tue, 30 July 2020 14:41:44 GMT; Secure;`,
                                   "HttpOnly=HttpOnly; Expires=Fri, 30 July 2020 14:41:44 GMT; HttpOnly;samesite=lax",
                                   "Domain=localhost; Expires=Fri, 30 July 2020 14:41:44 GMT; domain=localhost;samesite=lax",
                                   "path=/; Expires=Fri, 30 July 2020 14:41:44 GMT; path=/;samesite=lax",
                                   "sameSite=strict_lax_none; Expires=Fri, 30 July 2020 14:41:44 GMT; samesite=lax",
                                   "__Host-cookiePrefix=cookiePrefix; Expires=Fri, 30 July 2020 16:41:44 GMT; secure; path=/;samesite=lax",
                                   "__Secure-cookiePrefix=cookiePrefix; Expires=Fri, 30 July 2020 16:41:44 GMT; secure;samesite=lax"
                               ])
   
                               res.end('1', 'utf-8', () => {
                                   console.log('201 created, will send cookie along')
                               })
                           })
                       })
   
   
                   })
                   .on('aborted', () => {
                       console.log("Emitted when the request has been aborted.")
                   })
                   .on('close', () => {
                       console.log("Indicates that the underlying connection was closed.")
                   })
   
               console.log("req.aborted", req.aborted)
               console.log("req.complete", req.complete)
               console.log("req.headers", req.headers)
               console.log("req.httpVersion", req.httpVersion)
               console.log("req.method", req.method)
               // console.log("req.rawHeaders", req.rawHeaders)
               console.log("req.rawTrailers", req.rawTrailers)
               // console.log("req.socket", req.socket)
               console.log("req.statusCode", req.statusCode)
               console.log("req.statusMessage", req.statusMessage)
               // console.log("req.trailers", req.trailers)
               console.log("req.url", req.url)
   
               // req.setTimeout(1, () => {
               //     console.log("req setTimeout")
               // })
   
   
           } else if (req.method === 'GET') {
               fs.readFile(filePath, (err, data) => {
                   // if (err) throw err
                   if (err) {
                       // console.log('static.js, no such file ' + filePath);
                       // console.log("res.statusCode", res.statusCode)
                       // console.log("res.statusMessage", res.statusMessage)
                       // res.setHeader('Content-Type', 'text/html');
                       // res.setHeader('Content-Type', 'text/javascript')
                       res.writeHead(404, {
                           // 'Content-Length': Buffer.byteLength(body),
                           // 'Content-Type': 'text/plain'
                       })
                       res.end('static.js, no such file');
                   }
                   // console.log('file content:', data)
   
                   else {
   
                       let fileExtension,
                           fileExtensionRegExp,
                           test;
                       // console.log("static.js pathname", pathname)
   
                       fileExtensionRegExp = /\.html$/
                       test = fileExtensionRegExp.test(pathname)
                       if (test) {
                           res.setHeader('Content-Type', 'text/html');
                           res.setHeader('cache-control', 'no-store')
                       }
   
                       fileExtensionRegExp = /\.m?js$/
                       test = fileExtensionRegExp.test(pathname)
                       // console.log("static.js test", test)
                       // console.log("static.js data", data)
                       if (test) {
                           // console.log(res.getHeaders())
                           res.setHeader('Content-Type', 'text/javascript');
                           res.setHeader('cache-control', 'public, max-age=604800, immutable')
                       }
   
                       fileExtensionRegExp = /\.css$/
                       test = fileExtensionRegExp.test(pathname)
                       if (test) {
                           res.setHeader('Content-Type', 'text/css');
                           res.setHeader('cache-control', 'no-cache, private, max-age=100')
                           // res.setHeader('age', '0')   proxy
                           res.setHeader('vary', '*')
                       }
   
   
                       fileExtensionRegExp = /\.png$/
                       test = fileExtensionRegExp.test(pathname)
                       if (test) {
                           res.setHeader('Content-Type', 'image/png');
                       }
   
                       fileExtensionRegExp = /\.jpg$/
                       test = fileExtensionRegExp.test(pathname)
                       if (test) {
                           res.setHeader('Content-Type', 'image/jpg');
                           res.setHeader('cache-control', 'max-age=60')
                       }
   
                       fileExtensionRegExp = /\.mp4$/
                       test = fileExtensionRegExp.test(pathname)
                       if (test) {
                           res.setHeader('Content-Type', 'video/mp4');
                           res.setHeader('cache-control', 'max-age=80')
                       }
   
                       fileExtensionRegExp = /\.txt$/
                       test = fileExtensionRegExp.test(pathname)
                       if (test) {
                           res.setHeader('Content-Type', 'text/plain');
                           res.setHeader('cache-control', 'max-age=80')
                       }
   
   
                       // res.statusCode = 200
                       // res.statusMessage = 'allow to donwload this file'
                       res.setHeader('content-length', data.length);
                       res.setHeader('accept-ranges', 'bytes')
                       res.setHeader('server', 'node.js')
                       // res.setHeader('last-modified', '')
                       res.setHeader('keep-alive', 'timeout=5, max=1000')
   
                       // console.info(
                       //     req.headers.origin
                       // )
                       if (whitelistOrigins.includes(req.headers.origin)) {
                           res.setHeader('access-control-allow-origin', req.headers.origin)
                           res.setHeader('vary', 'origin')
                           res.end(data)
                       } else {
                           res.end(data)
                       }
                   }
   
               })
           } else { }
   
       } else {
           // console.log("pathname.indexOf('/' + folder) !== 0, static.js")
           // res.end('404, static.js');
       }
       /*
       fs.readFile(thePath, (err, data) => {
           if (err) throw err
           console.log(data)
       })
       */
   }