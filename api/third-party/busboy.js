var Busboy = require('busboy'),
    inspect = require('util').inspect;
// var inspect = require('inspector')

module.exports = (req) => {
    return new Promise((resolve, reject) => {
        if (
            req.method === 'POST' ||
            req.method === 'PATCH'
        ) {
            let data = new Object()
            var busboy = new Busboy({ headers: req.headers });
            busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
                console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
                file.on('data', function (data) {
                    console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
                });
                file.on('end', function () {
                    console.log('File [' + fieldname + '] Finished');
                });
            });
            busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
                console.log('busboy.js - on - Field [' + fieldname + ']: value: ' + inspect(val));
                Object.defineProperty(data, fieldname, {
                    value: val,
                    configurable: true,
                    enumerable: true,
                    writable: true
                })

            });
            busboy.on('finish', function () {
                console.log('Done parsing form!');
                console.log("data", data)

                resolve(data)

                // res.writeHead(303, { Connection: 'close', Location: '/' });
                // res.end();
            });
            req.pipe(busboy);
        } else if (req.method === 'GET') {
            res.writeHead(200, { Connection: 'close' });
            res.end('<html><head></head><body>\
                   <form method="POST" enctype="multipart/form-data">\
                    <input type="text" name="textfield"><br />\
                    <input type="file" name="filefield"><br />\
                    <input type="submit">\
                  </form>\
                </body></html>');
        }
    })
}