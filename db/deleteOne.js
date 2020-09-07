const getObjectId = require('./getObjectId')
module.exports = (db, query) => {
    return new Promise((resolve, reject) => {
        let _id = '',
            doc = {},
            collection = db.collection('index'),
            objectId = ''

        if (query instanceof URLSearchParams === false) {
            throw new Error('not an instance of URLSearchParams')
        }

        ; (async () => {
            try {
                _id = query.get('_id')
                objectId = await getObjectId(_id)
                doc = {
                    _id: objectId
                }
            } catch (e) {
                throw new Error('bad luck, ' + e)
            }

            const cursor = await collection.deleteOne(doc)
            // console.info("cursor", cursor)
            resolve({
                deletedCount: cursor.deletedCount,
            })
        })()

    })
}




