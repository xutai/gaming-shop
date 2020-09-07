const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
    const url = require('url').parse(req.url)
    if (url.pathname === '/pages/gaming/editing_games_submitted') {
        console.log('/gaming/editing_games_submitted')


        //https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/

        var query;

        console.log(req.method)
        if (req.method === "GET") {

            // --------
            // // for get method
            const query = querystring.parse(url.query, "&", "=", {
                decodeURIComponent: querystring.unescape(),
                maxKeys: 1000
            })
            console.log("query:", query)
            // --------

        } else if (req.method === "POST") {
            // for post method
            let body = []
            req.on('data', (chunk) => {
                // console.log(chunk)
                body.push(chunk)
            }).on('end', () => {
                body = Buffer.concat(body).toString()
                console.log("body:", body)


                query = querystring.parse(body, "&", "=", {
                    decodeURIComponent: querystring.unescape(),
                    maxKeys: 1000
                })
                console.log("query:", query)
                // query is not iterable!!

            })


        }






        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert');

        // Connection URL
        const url = 'mongodb://localhost:27017';

        // Database Name
        const dbName = 'pcgames';

        // Create a new MongoClient
        const client = new MongoClient(url);

        // Use connect method to connect to the Server
        client.connect(function (err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const col = db.collection('index');


            const ObjectID = require('mongodb').ObjectID
            let objid = new ObjectID(query._id)
            // Update a single document
            col.updateOne({ _id: objid }, {
                $set: {
                    ename: query.ename,
                    cname: query.cname,
                    save: query.save,
                    trainer: query.trainer,
                    guide: query.guide,
                    bilibili: query.bilibili,
                    note: query.note
                }
            }, function (err, r) {
                assert.equal(null, err);
                assert.equal(1, r.matchedCount);
                // assert.equal(1, r.modifiedCount);
                console.log('done writing!')


                client.close()
            });

        });



        res.end('done')
    }
}