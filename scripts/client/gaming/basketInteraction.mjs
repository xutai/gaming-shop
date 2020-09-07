
function addOne(__id) {
    let number = Number(document.querySelector(`#number_${__id}`).textContent)
    ++number
    document.querySelector(`#number_${__id}`).textContent = String(number)
    updateTotalPrice(__id)
    shoppingModule.updateItem(__id, +1)
    shoppingModule.priceCount(__id)
    shoppingModule.totalPriceCount()
}
function minusOne(__id) {
    let number = Number(document.querySelector(`#number_${__id}`).textContent)
    if (number > 1) {
        --number
        document.querySelector(`#number_${__id}`).textContent = String(number)
        updateTotalPrice(__id)
        shoppingModule.updateItem(__id, -1)
        shoppingModule.priceCount(__id)
        shoppingModule.totalPriceCount()
    }
}
function removeItem(__id) {
    const el = document.querySelector(`#game_${__id}`)
    let number = Number(document.querySelector(`#number_${__id}`).textContent)
    let price = Number(document.querySelector(`#price_${__id}`).textContent)
    let totalPrice = number * price
    updateAllTotalPrice(-totalPrice)
    shoppingModule.removeItem(__id)
    shoppingModule.totalPriceCount()
    el.parentNode.removeChild(el)
}