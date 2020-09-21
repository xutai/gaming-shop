const { insertDoc: gamingDoc } = require('./schemes/pcgames')
const { insertDoc: userDoc } = require('./schemes/user')
const operateCollection = async (collection, updateDocument, resolve) => {
    console.info("updateDocument", updateDocument)
    const result = await collection.insertOne(updateDocument)
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
                    {
                        console.info("query", query)
                        let { updateDocument } = await userDoc(query)
                        console.info("updateDocument", updateDocument)
                        operateCollection(collection, updateDocument, resolve)
                        break;
                    }
                case 'pcgames':
                    {
                        let { updateDocument } = await gamingDoc(query)
                        operateCollection(collection, updateDocument, resolve)
                        break
                    }
                default:
                    break;
            }
        })()
    })
}


