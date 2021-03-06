const insertOne = require('./insertOne')
const find = require('./find')
const findOne = require('./findOne')
const findAll = require('./findAll')
const deleteOne = require('./deleteOne')
const updateOne = require('./updateOne')
const dbConfig = require('../config/db')
module.exports = (dbName, type, query) => {
    return new Promise((resolve, reject) => {
        // console.info(__filename)
        const { MongoClient } = require('mongodb');
        // const dburl = dburl || 'mongodb://localhost:27017'
        const username = ''
        const password = ''
        const dburl = dbConfig.prod.url
        dbName = dbName || 'pcgames'
        query = query || new URLSearchParams()
        const client = MongoClient(dburl)
        client.connect(function (err) {
            console.log(`Connected successfully to db server ${dburl}`)
            const db = client.db(dbName)
                ; (async () => {
                    let result = {}
                    switch (type) {
                        case 'findOne':
                            result = await findOne(db, query)
                            break;
                        case 'findAll':
                            result = await findAll(db, query)
                            break;
                        case 'find':
                            result = await find(db, query)
                            break;
                        case 'insertOne':
                            result = await findOne(db, query)
                            switch (result.dbName) {
                                case 'user':
                                    if (result.record.hasOwnProperty('username')) {
                                        result = 'username found'
                                    } else {
                                        result = await insertOne(db, query)
                                    }
                                    break
                                case 'pcgames':
                                    if (result.record.hasOwnProperty('_id')) {
                                        result = 'game record found'
                                    } else {
                                        result = await insertOne(db, query)
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case 'updateOne':
                            result = await findOne(db, query)
                            console.trace("result", result)
                            switch (result.dbName) {
                                case 'user':
                                    if (!result.record.hasOwnProperty('username')) {
                                        result = 'username or password not correct'
                                    } else {
                                        result = await updateOne(db, query)
                                    }
                                    break
                                case 'pcgames':
                                    if (!result.record.hasOwnProperty('_id')) {
                                        result = 'no game record found'
                                    } else {
                                        result = await updateOne(db, query)
                                    }
                                    break;
                                default:
                                    break;
                            }

                            break;
                        case 'deleteOne':
                            result = await deleteOne(db, query)
                            //  = await findOne(db, query)
                            break;
                        default:
                    }
                    resolve(result)
                    client.close()
                })()
        })
    })
}