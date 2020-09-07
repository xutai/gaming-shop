const fs = require('fs')
const path = require('path')

module.exports = (dir, pathSegment, fileName, fileExtension) => {
    return new Promise((resolve, reject) => {
        // console.log(
        //     "read-file.js",
        //     "dir", dir,
        //     "pathSegment", pathSegment,
        //     "fileName", fileName,
        //     "fileExtension", fileExtension
        // )
        pathSegment = dir + pathSegment
        fileName = fileName + '.' + fileExtension
        const newPath = path.resolve(pathSegment, fileName)
        // console.log(
        //     "newPath", newPath,
        // )

        fs.readFile(newPath, (err, data) => {
            if (err) throw err
            resolve(data)
        })
    })

}