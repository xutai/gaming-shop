import { cookieObj } from '../cookie.mjs'
//Get a cookie value
export function getCookieValue(cookieName) {
    const array = cookieObj.getCookieArray()
    // console.debug("getCookieValue() array", array)
    const reducer = (
        accumulator,
        currentValue,
        currentIndex,
        array
    ) => {
        // accumulator * 0 + currentValue.
        // console.debug(
        //     accumulator,
        //     currentValue,
        //     currentIndex,
        //     array
        // )
        if (currentValue[0] === cookieName) {
            return currentValue[1]
        } else {
            return accumulator
        }
    }
    const value = array.reduce(
        reducer,
        ["", ""]
    )
    // console.debug("getCookieValue(){} value:", value)
    // Array [ "username", "xutai" ]
    // return value[1]

    // debugger;

    return value
}
