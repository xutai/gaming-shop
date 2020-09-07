

function setBasketLocalStorage(key, value) {
    localStorage.setItem(key, value) 
}
function getBasketLocalStorage(key) {
    return localStorage.getItem(key) 
}

export {  setBasketLocalStorage, getBasketLocalStorage }