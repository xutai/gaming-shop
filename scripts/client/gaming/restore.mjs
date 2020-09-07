function reloadBasketUI(basketObj) {
    let ename,
        price,
        number,
        totalPrice,
        totalPriceSum = 0;
    const shoppingCartUl = document.querySelector('.shopping-cart-ul')
    for (let _id in basketObj) {
        let __id = _id
        ename = basketObj[_id].ename
        price = basketObj[_id].price
        number = basketObj[_id].number
        totalPrice = price * number
        totalPriceSum += totalPrice
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
    }
    document.querySelector('.totalPriceCount').textContent = totalPriceSum

}
