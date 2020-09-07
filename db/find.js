const getObjectId = require('./getObjectId')
const { findDoc: userDoc } = require('./schemes/user')
const { findDoc: gamingDoc } = require('./schemes/pcgames')
const operateCollection = async (collection, queryDocument, options, resolve) => {
    const cursor = collection.find(queryDocument, options)
    let record = []
    // for each functional iteration
    // await theOneCursor.forEach(
    //     doc => {
    //         record = doc
    //     }
    // )
    // asynchronous iteration
    console.time('yayaya!!!')
    // style 1 - problematic
    // for await (const doc of cursor) {
    //     cursor
    //         .next()
    //         .then(
    //             fulfilled => record.push(fulfilled)
    //         )
    // }
    // style 2 - problematic
    // for await (const doc of cursor) {
    //     record.push(await cursor.next())
    // }
    // style 3
    for await (const doc of cursor) {
        record.push(doc)
    }
    // style 4 - not working
    // cursor.forEach((value, index, array) => {
    //     record.push(value)
    // }, this)
    // cursor.forEach(console.dir)
    // style 5
    // await cursor.toArray().then(docs => record = docs)
    // style 6
    // cursor.toArray((err, docs) => resolve({ record: docs }))
    // console.log(record)
    console.log("record.length", record.length)
    console.timeEnd('yayaya!!!')

    resolve({
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

        console.info("urlSearchQuery", urlSearchQuery)

        const steamId = urlSearchQuery.get('steamId')
        options = {
            sort: {
                // username: 1
            },
            projection: {
                // _id: 0,
                // username: 1
            }
        }

            ; (async () => {
                try {
                    switch (dbName) {
                        case 'user':
                            queryDocument = await userDoc(urlSearchQuery)
                            operateCollection(collection, queryDocument, options, resolve)
                            break;
                        case 'pcgames':
                            queryDocument = await gamingDoc(urlSearchQuery)
                            // _id = urlSearchQuery.get('_id')
                            // objectId = await getObjectId(_id)
                            queryDocument = {
                                // _id: objectId,
                                // _id: { $eq: objectId }
                                // ...queryDocument
                                // steamId: { $exists: true }
                                steamId: { $exists: steamId || false }
                            }
                            operateCollection(collection, queryDocument, options, resolve)
                            break;
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




