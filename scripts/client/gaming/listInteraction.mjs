

function toEdit(__id) {
    console.log(__id)

    // var httpRequest = new XMLHttpRequest()
    // httpRequest.onreadystatechange = function() {}
    // httpRequest.open('GET', '/gaming/editing_games', true)
    // httpRequest.send()
    window.location.assign(`/gaming/editing_games/\${__id}`)
}

function toEditCallback(__id) {
    return function () {
        toEdit(__id)
    }
}


function addToShoppingCartCallback(__id) {
    return function () {
        addToShoppingCart(__id)
    }
}




function addToShoppingCart(__id) {
    const item = document.querySelector(`#game_${__id}`)
    if (item) {
        let itemInBasket = shoppingModule.getItem(__id)
        item.querySelector('.number').textContent = String(itemInBasket.number + 1)
        shoppingModule.updateItem(__id, +1)
        shoppingModule.priceCount(__id)
        shoppingModule.totalPriceCount()
        updateTotalPrice(__id)
    } else {
        const shoppingCartUl = document.querySelector('.shopping-cart-ul')
        const p = document.querySelector(`#el_${__id}`)
        const ename = p.textContent.replace('ename:', '')
        const priceEl = document.querySelector(`#price_${__id}`)
        console.log(priceEl.textContent)
        let price = priceEl.textContent.replace(/^¥/, '')
        price = Number(price)
        let number = 1
        let totalPrice = number * price
        let div = document.createElement('div')
        div.setAttribute('id', `game_${__id}`)
        div.innerHTML = `
        <span class="ename" id="ename_${__id}">${ename}</span>
        <span class="price" id="price_${__id}">${price}</span>
        <span class="number" id="number_${__id}">${number}</span>
        <span class="totalPrice" id="totalPrice_${__id}">${totalPrice}</span>
        <span class="addOne" id="addOne_${__id}"><button>+</button></span>
        <span class="minusOne" id="minusOne_${__id}"><button>-</button></span>
        <span class="removeItem" id="removeItem_${__id}"><button>remove item</button></span>
        `
        shoppingCartUl.append(div)

        const addOneEl = document.querySelector(`#addOne_${__id}`)
        const minusOneEl = document.querySelector(`#minusOne_${__id}`)
        const removeItemEl = document.querySelector(`#removeItem_${__id}`)
        addOneEl.addEventListener('click', function () {
            addOne(__id)
        })
        minusOneEl.addEventListener('click', function () {
            minusOne(__id)
        })
        removeItemEl.addEventListener('click', function () {
            removeItem(__id)
        })
        updateAllTotalPrice(totalPrice)

        const item = {
            _id: __id,
            ename,
            price,
            number
        }
        shoppingModule.addItem(item)
        shoppingModule.priceCount(__id)
        shoppingModule.totalPriceCount()
    }
}
