const assert = require('assert')
module.exports = (db, query) => {
    return new Promise((resolve, reject) => {
        // get all data
        ; (async () => {
            const collection = db.collection('index');
            // Get first two documents that match the query
            // col.find({}).limit(2).toArray(function(err, docs) {

            const queryDocument = {}
            const options = {
                sort: {},
                projection: {}
            }

            const cursor = await collection.find(queryDocument, options)
            console.info("cursor.count()",cursor.count())
            if (cursor.count() === 0) {
                console.log("no documents found!")
                resolve({})
            }
            else {
                // await cursor.forEach(console.dir)
                cursor.toArray(
                    (err, docs) => {
                        assert.equal(null, err);
                        // assert.equal(2, docs.length);
                        // console.info("docs",docs)
                        resolve(docs)
                    });
            }


        })()
    })
}



