const ObjectID = require('mongodb').ObjectID
module.exports = (_id) => {
    return new Promise((resolve, reject) => {
        const objectId = new ObjectID(`${_id}`)
        resolve(
            objectId
        )
    })
}

