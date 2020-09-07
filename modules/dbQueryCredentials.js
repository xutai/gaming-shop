module.exports = (username = '', password = '') => {

    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert')
    const dburl = 'mongodb://localhost:27017'
    const dbName = 'user'
    const client = new MongoClient(dburl)

    return new Promise((resolve, reject) => {
        client.connect(function (err, client) {
            assert.equal(null, err)
            console.log(`Connected successfully to db server ${dburl} dbQueryCredentials.js.`)

            const db = client.db(dbName);
            const col = db.collection('index');

            // Get first two documents that match the query
            // col.find({}).limit(2).toArray(function(err, docs) {
            col.find({}).toArray(function (err, docs) {
                assert.equal(null, err);
                // assert.equal(2, docs.length);
                console.log("docs", docs)
                client.close();

                const record = docs.find(el => el.username === username)

                resolve({
                    record
                })
            });
        })
    })


} 