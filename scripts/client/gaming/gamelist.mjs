// import { basketModule, shoppingModule } from '../util/shopping_basket.mjs'
import { basketModule, shoppingModule } from 'http://localhost:8083/scripts/client/util/shopping_basket.mjs'

export {
    addToShoppingCartCallback,
    reloadBasketUI,
    addToShoppingCart,
    addOne,
    minusOne,
    removeItem,
    updateTotalPrice,
    updateAllTotalPrice
}
export default function (basketModule, shoppingModule) {
    console.log("basketModule", basketModule)
    console.log("shoppingModule", shoppingModule)

    // const toEditButtons = document.querySelectorAll('.toEdit') 
    const addToShoppingCartButtons = document.querySelectorAll('.addToShoppingCartButton') 

    for (let i = addToShoppingCartButtons.length; i > 0; i--) {
        let __id = addToShoppingCartButtons[i - 1].getAttribute('data-_id')
        addToShoppingCartButtons[i - 1].addEventListener('click', addToShoppingCartCallback(__id))
        // if (toEditButtons.length) toEditButtons[i - 1].addEventListener('click', toEditCallback(__id))
    }
}

