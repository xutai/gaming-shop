const { insertDoc: gamingDoc } = require('./schemes/pcgames')
const { insertDoc: userDoc } = require('./schemes/user')
const operateCollection = async (collection, doc, resolve) => {
    const result = await collection.insertOne(doc)
    resolve({
        // result: result,
        insertedCount: result.insertedCount,
        insertedId: result.insertedId
    })
}
module.exports = (db, query) => {
    return new Promise((resolve, reject) => {
        // CRUD - create - insert documents
        ; (async () => {
            if (query instanceof URLSearchParams === false) {
                throw new Error('not an instance of URLSearchParams')
            }
            let doc = {},
                collection = db.collection('index'),
                dbName = collection.dbName;

            // console.log("dbName", dbName)
            // console.info("query", query)

            switch (dbName) {
                case 'user':
                    doc = await userDoc(query)
                    // console.info("doc", doc)
                    operateCollection(collection, doc, resolve)
                    break;
                case 'pcgames':
                    doc = await gamingDoc(query)
                    operateCollection(collection, doc, resolve)
                    break
                default:
                    break;
            }
        })()
    })
}


