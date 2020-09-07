function updateTotalPrice(__id) {
    let totalPrice = document.querySelector(`#totalPrice_${__id}`).textContent
    let totalPriceBefore = Number(totalPrice)
    let number = Number(document.querySelector(`#number_${__id}`).textContent)
    let price = Number(document.querySelector(`#price_${__id}`).textContent)
    let totalPriceAfter = number * price
    document.querySelector(`#totalPrice_${__id}`).textContent = totalPriceAfter
    updateAllTotalPrice(totalPriceAfter - totalPriceBefore)
}
function updateAllTotalPrice(difference) {
    let totalPriceCountEl = document.querySelector('.totalPriceCount')
    let totalPriceCount = Number(totalPriceCountEl.textContent)
    totalPriceCount += difference
    totalPriceCount = String(totalPriceCount)
    document.querySelector('.totalPriceCount').textContent = totalPriceCount
}