const hrefPromise = import('../scripts/client/config/href.mjs')
module.exports = (display, docs) => {
    return new Promise((resolve, reject) => {
        ; (async () => {
            const hrefObj = await hrefPromise
            const href = hrefObj.href
            display += `<section class="gamelist-grid">`
            for (var i = 0; i < docs.length; i++) {
                var _id = docs[i]._id
                var steamId = docs[i].steamId
                display += `<div class="item">`

                //  add title
                for (const property in docs[i]) {

                    if (property === 'note') {
                        docs[i][property] = decodeURIComponent(docs[i][property])
                        docs[i][property] = docs[i][property].replace(/\n/g, "<br>")
                        // docs[i][property] = unescape(docs[i][property]).replace(/\n/g, "<br>")
                    }

                    if (property === 'ename'
                    ) {
                        display += `<p class="gameName" data-_id="${_id}" id="el_${_id}">${docs[i][property]}</p>`
                    }
                }
                // add image
                display += `<img data-steam-id="${steamId}" class="game_image" id="steamId_${steamId}" src="${href}/images/noimage.jpg">`
                display += `<span class="price" id="price_${_id}" data-_id="${_id}">¥12</span>`
                
                display += `<button type="button" class="toEdit" data-_id="${_id}" >edit</button>`
                display += `<button type="button" class="toDelete" data-_id="${_id}" >delete</button>`
                // display += `<button type="button" class="addToShoppingCartButton" data-_id="${_id}" >add to shopping cart</button>`
                display += `</div>`
            }
            display += `</section>`
            resolve(display)
        })()
    })
}