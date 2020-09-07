const fs = require('fs')
const path = require('path')
module.exports = (req, res) => {
    const url = require('url').parse(req.url)
     if (url.pathname === '/pages/gaming/finding_games') {
        const query = querystring.parse(url.query, "&", "=", {
            decodeURIComponent: querystring.unescape(),
            maxKeys: 1000
        })
        console.log("query:", query)

        // db operations
        const MongoClient = require('mongodb').MongoClient;
        const dburl = 'mongodb://localhost:27017'
        const dbName = 'pcgames'
        const client = MongoClient(dburl)
        client.connect(function (err) {
            console.log("Connected successfully to server")
            const db = client.db(dbName)
            //console.log(db)

            // let queryProperty = ''
            // let queryValue = ''
            // if (query.ename) {
            //     queryProperty = "ename"
            //     queryValue = query.ename
            // } else if (query._id) {
            const ObjectID = require('mongodb').ObjectID
            let objectid = new ObjectID(query._id)
            //     queryProperty = "_id"
            //     queryValue = objectid
            // } else {
            //     res.end('no valid query')
            // }

            // let querySetence = `{
            //     ${queryProperty}: ${queryValue}
            // }`
            // console.log("querySetence:", querySetence)

            if (query.ename) {
                res.end('currently query by ename is not supported')
            }

            const theOne = db.collection('index').find(
                // querySetence
                // `{_id: ${queryValue}}` won't work
                // {_id:  queryValue}
                // {queryProperty: queryValue}
                { _id: objectid }
            ).each(function (err, doc) {
                console.log("doc:", doc)
                console.log(typeof doc)
                if (doc != null) {
                    // res.writeHead(302, 'I should redirect you to the previous page', {
                    //     location: '/to_find_games'
                    // })
                    // 这里不要用unescape而要用decodeURIComponent，原因mdn上有提到，就是unescape不怎么支持的，这个适合node.js后台用，前台不要用
                    // let note = unescape(doc.note)
                    // console.log(note)
                    // console.log(note.replace("\t","<br>"))
                    // console.log(note.replace("\n\t","<br>"))
                    // console.log("note.replace:",note.replace(/\n/g, "<br>"))
                    // console.log(note.replace("%0A","<br>"))
                    let note = decodeURIComponent(doc.note)
                    // console.log("decodeURIComponent:",decodeURIComponent(note))
                    const note_with_line_break = note.replace(/\n/g, "<br>")
                    console.log("doc.cname", doc.cname)
                    res.end(`
                    <html>
                    <head>
                    <meta charset="utf-8">
                    _id:${doc._id}
                    , <br> 
                    ename:${doc.ename}
                    , <br> 
                    cname:${doc.cname}
                    , <br> 
                    save:${doc.save}
                    , <br> 
                    trainer:${doc.trainer}
                    , <br> 
                    guide:${doc.guide}
                    , <br> 
                    bilibili:${doc.bilibili}
                    , <br> 
                    note:${note_with_line_break}
                    </head>
                    </html>
                    `, 'utf-8', function (err) {
                        console.err
                    })
                } else {
                    console.log('why this is null?')
                }
            })
            //console.log(theOne)
            client.close()
        })

        /*
        从前端提交过来的数据，后端在这里拿到  ok
        这里要准备一下哪些数据要发到服务器  ok
        连接数据库
        创建表单
        发送请求
        回调函数或者结果
        */
        // query string 要引入query string这个模块
    }
}