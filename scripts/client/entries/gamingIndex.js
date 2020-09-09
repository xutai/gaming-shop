// <script src="../xhr/xhr.js" defer></script>
/* <script src="../gaming/shopping.js" defer></script>
<script src="../xhr/fetch.js" defer></script>
<script src="../util/counter.js" defer></script>
<script src="../util/shopping_basket.js" defer></script> */

// backup operations
// /=scripts/client/ -> http://localhost:8083../
// -> ../ 

// import { getUsefulContents, writeToJson, toggleStatus, postFormData } from '../xhr/xhr.mjs'
// import { findBasket, basketModule, shoppingModule } from '../util/shopping_basket.mjs'
import { findBasket, basketModule, shoppingModule } from 'http://localhost:8083/scripts/client/util/shopping_basket.mjs'
import {
    default as gamelistModule,
    // toEdit,
    // toEditCallback,
    addToShoppingCartCallback,
    reloadBasketUI,
    addToShoppingCart,
    addOne,
    minusOne,
    removeItem,
    updateTotalPrice,
    updateAllTotalPrice
} from '../gaming/gamelist.mjs'
import fetchModule from '../xhr/fetch.mjs'
// import { counter, makeCounter } from '../util/counter.mjs'
import { counter, makeCounter } from 'http://localhost:8083/scripts/client/util/counter.mjs'

findBasket()
gamelistModule()
fetchModule()

export {
    addToShoppingCartCallback,
}
export default function () {
    findBasket()
    // gamelistModule(basketModule, shoppingModule)
    gamelistModule()
    fetchModule()
}
// export { findBasket, gamelistModule }

