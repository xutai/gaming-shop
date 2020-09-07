const fs = require('fs')
const path = require('path')
module.exports = (req, res) => {
    const url = require('url').parse(req.url)
    
    let regExp = /^\/pages\/gaming\/editing_games\/[a-z0-9]+/
    if (regExp.test(url.pathname) === true) {
        let _id = url.pathname.replace('/pages/gaming/editing_games/', '')

        const MongoClient = require('mongodb').MongoClient;
        const assert = require('assert')
        // Connection URL
        const dburl = 'mongodb://localhost:27017'
        // Database Name
        const dbName = 'pcgames'

        // Create a new MongoClient
        const client = new MongoClient(dburl)
        // const client = MongoClient(dburl)

        client.connect(function (err, client) {
            assert.equal(null, err)
            console.log("Connected correctly to server");

            const db = client.db(dbName);

            const col = db.collection('index');

            // Get first two documents that match the query
            // col.find({}).limit(2).toArray(function(err, docs) {
            console.log('_id:', `new ObjectId("${_id}")`)
            const ObjectID = require('mongodb').ObjectID
            let objectid = new ObjectID(`${_id}`)
            col.find({ _id: objectid }).toArray(function (err, docs) {
                assert.equal(null, err);
                // assert.equal(2, docs.length);
                // console.log(docs)


                function buildHtml(req) {
                    var header = ''
                    var body = ''

                    //concatenate header string
                    header += `
                    <head>
                    <meta charset="utf-8">
                    <style>
                    .item {
                        border: 1px solid lightblue;
                    }
                    </style>
                    </head>
                    `

                    //concatenate body string
                    var display = ''
                    for (i = 0; i < docs.length; i++) {
                        var _id = docs[i]._id
                        display += `<form action="/eiditing_games_submited" method="POST" enctype="multipart/form-data" class="form">`
                        // console.log(docs[i])
                        // console.log(docs[i].toString())
                        // console.log(JSON.stringify(docs[i]))
                        // console.log(JSON.stringify(docs[i].toString()))

                        // how to handle \ in json string
                        // display += `<script>
                        // let str = '${JSON.stringify(docs[i])}'
                        // str = encodeURIComponent(str)
                        // console.log(str)
                        // str = decodeURIComponent(str)
                        // console.log(str)
                        // let docs = JSON.parse(str)
                        // for (const property in docs[i]) {
                        //     console.log("docs[i][property]")
                        // }
                        // console.log("${docs[i]}")
                        // </script>`

                        // for...in
                        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
                        for (const property in docs[i]) {
                            display += `<div>`
                            // display += `<p>${docs[i][property]}</p>`
                            if (property === 'note') {
                                // docs[i][property] = unescape(docs[i][property])
                                // docs[i][property] = querystring.parse(docs[i][property])
                                // let str = ''
                                // str = querystring.parse(docs[i][property])
                                // obj
                                // console.log(querystring.parse(docs[i][property]))
                                // console.log(str, typeof str)
                                // docs[i][property] = querystring.parse(docs[i][property], null, null, { decodeURIComponent: querystring.unescape() })
                                docs[i][property] = decodeURIComponent(docs[i][property])
                                // console.log("docs[i][property]:",docs[i][property])
                                // console.log("unescape(docs[i][property]):",unescape(docs[i][property]))
                                // console.log("decodeURIComponent(docs[i][property]):",decodeURIComponent(docs[i][property]))
                                // console.log('中文')
                                docs[i][property] = docs[i][property].replace(/\n/g, "<br>")
                                // docs[i][property] = unescape(docs[i][property]).replace(/\n/g, "<br>")
                            }
                            if (`${property}` === '_id') {
                                display += `     
                                <label for="${property}">${property}:</label>
                                <input id="${property}" name="${property}" value="${docs[i][property]}" disabled>
                                `
                            } else if (`${property}` === 'note') {
                                display += `     
                                <label for="note">note</label>
                                <input type="text" name="note" id="note" style="display:none">
                                <textarea rows="20" cols="60" id="t1">
                                ${docs[i][property]}
                                </textarea>
                                `
                            } else {
                                display += `     
                                <label for="${property}">${property}:</label>
                                <input id="${property}" name="${property}" value="${docs[i][property]}">
                                `
                            }
                            display += `</div>`



                        }
                        display += `<button type="button" onclick="toEdit('${_id}')">edit</button>`
                        display += ` </form>`
                    }
                    body += display
                    body += `
                    <script>
                        function toEdit(__id) {
                            console.log("__id",__id)

                            const editorValue = document.getElementById('t1').value
                            const encodedValue = encodeURIComponent(editorValue)
                            document.getElementById('note').value = encodedValue



                            // ajax 
                            // https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started
                            var httpRequest = new XMLHttpRequest()
                            httpRequest.onreadystatechange = function(res) {
                                console.log("res",res)

                                if (httpRequest.readyState === XMLHttpRequest.DONE) {
                                    // Everything is good, the response was received.
                                    if(httpRequest.status === 200) {
                                        console.log("res.responseText:",res.responseText)
                                        console.log("httpRequest.responseText:",httpRequest.responseText)
                                        // window.alert("httpRequest.responseText:",httpRequest.responseText)
                                        if (httpRequest.responseText === 'done') {
                                            const confirmation = window.confirm(\`submitted successfully; click comfirm will jump you to  /finding_games?_id=\${__id}\`)
                                            if (confirmation === true) {
                                                window.setTimeout(function(){
                                                    window.location.assign(\`/finding_games?_id=\${__id}\`)
                                                }, 100)
                                            }
          
                                        }
                                   
                                    } else {

                                        console.log("httpRequest.status !== 200", httpRequest.status)
                                    }
                                } else {
                                    // Not ready yet.
                                    console.log("httpRequest.readyState !== XMLHttpRequest.DONE",httpRequest.readyState )
                                }


                               
                            }
                            httpRequest.open('POST', '/gaming/editing_games_submitted', true)

                            // if i use formData, but i don't want to use middleware in node.js

                            // const form = document.getElementsByClassName('form')[0]
                            // console.log("form",form)
                            // const formData = new FormData(form)
                            // console.log("formData",formData)
                            // console.log("formData.get('_id')",formData.get('_id'))
                            // console.log("formData.get('ename')",formData.get('ename'))
                            // // disabled input's value is totally ignored!!!!!
                            // const _id_el = document.getElementById('_id')
                            // formData.append('_id',_id_el.value)
                            // console.log("formData.get('_id')",formData.get('_id'))
                            // httpRequest.send(formData)


                            // i will sue urlsearchparams
                            // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
                            // var _id_val = document.getElementById('_id')
                            // directly using this way would be wasting time
                            const form = document.getElementsByClassName('form')[0]
                            const formData = new FormData(form)
                            var params = new URLSearchParams()
                            const _id_el = document.getElementById('_id')
                            params.append('_id',_id_el.value)
                            for (var pair of formData ) {
                                console.log(pair[0]+ ', '+ pair[1])
                                params.append(pair[0],pair[1])
                            }
                            httpRequest.send(params)


                        }
                       
                    </script>
                    `

                    return `
                    <!DOCTYPE html>
                    <html>
                    ${header}
                    ${body}
                    </html>
                    `
                }

                const html = buildHtml(req)
                // console.log(html)

                res.end(html)

                client.close();

            })

        })
    }
}