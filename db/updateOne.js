const { updateDoc: gamingDoc } = require('./schemes/pcgames')
const { updateDoc: userDoc } = require('./schemes/user')
const getObjectId = require('./getObjectId')
const operateCollection = async (collection, args, resolve) => {
    const {
        filter,
        updateDocument,
        options
    } = args
    console.log(__filename, "args", args)
    // const agg = [
    //     {
    //         '$addFields': {
    //             'price': 0
    //         }
    //     }
    // ];
    // const cursor = await collection.aggregate(agg, (cmdErr, result) => {
    //     console.log(
    //         cmdErr, 
    //         // result
    //     )
    //     // assert.equal(null, cmdErr);
    // })
    const result = await collection.updateOne(filter, updateDocument, options)
    resolve({
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
    })
}
module.exports = (db, query) => {
    return new Promise((resolve, reject) => {
        if (query instanceof URLSearchParams === false) {
            throw new Error('not an instance of URLSearchParams')
        }
        ; (async () => {
            try {
                let
                    collection = db.collection('index'),
                    dbName = collection.dbName,
                    args = {};
                console.info(__filename, "query", query)
                switch (dbName) {
                    case 'user':
                        args = await userDoc(query)
                        operateCollection(collection, args, resolve)
                        break;
                    case 'pcgames':
                        args = await gamingDoc(query)
                        operateCollection(collection, args, resolve)
                        break
                    default:
                        break;
                }
            } catch (e) {
                console.error(e)
                // throw new Error('updateOne.js, bad luck, ' + e)
            }
            finally { }
        })()
    })
}


