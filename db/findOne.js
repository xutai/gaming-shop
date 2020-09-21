const getObjectId = require('./getObjectId')
const { findDoc: userDoc } = require('./schemes/user')
const { findDoc: gamingDoc } = require('./schemes/pcgames')
const operateCollection = async (dbName, collection, queryDocument, options, resolve) => {
    const cursor = collection.find(queryDocument, options)
    let record = {}
    // for each functional iteration
    // await theOneCursor.forEach(
    //     doc => {
    //         record = doc
    //     }
    // )
    // asynchronous iteration
    for await (const doc of cursor) {
        record = doc
    }
    console.log("record", record)
    resolve({
        dbName,
        record
    })
}
module.exports = (db, urlSearchQuery) => {
    return new Promise((resolve, reject) => {
        if (urlSearchQuery instanceof URLSearchParams === false) {
            throw new Error('not an instance of URLSearchParams')
        }
        let collection = db.collection('index'),
            dbName = collection.dbName,
            _id = '',
            queryDocument = {},
            options = {},
            objectId = '';

        options = {
            sort: {
                // username: 1
            },
            projection: {
                // username: 0
            }
        }
            ; (async () => {
                try {
                    switch (dbName) {
                        case 'user':
                            {
                                let queryDocument = await userDoc(urlSearchQuery)
                                console.trace("queryDocument:",queryDocument)
                                operateCollection(dbName, collection, queryDocument, options, resolve)
                                break;
                            }
                        case 'pcgames':
                            {
                                let { updateDocument: queryDocument } = await gamingDoc(urlSearchQuery)
                                _id = urlSearchQuery.get('_id')
                                // objectId = await getObjectId(_id)
                                queryDocument = {
                                    // _id: objectId,
                                    ...queryDocument
                                }
                                console.log("queryDocument", queryDocument)
                                operateCollection(dbName, collection, queryDocument, options, resolve)
                                break;
                            }
                        default:
                            break;
                    }
                } catch (e) {
                    // throw new Error('bad luck, ' + e)
                    console.error(e)
                    resolve({})
                    // resolve({
                    //     // error: {
                    //     //     message: e.message,
                    //     //     name: e.name,
                    //     //     fileName: e.fileName,
                    //     //     lineNumber: e.lineNumber,
                    //     //     colNumber: e.colNumber,
                    //     //     stack: e.stack
                    //     // }
                    //     error: e.toString()
                    // })
                    // reject(e.toString())
                } finally { }
            })()
    })
}




