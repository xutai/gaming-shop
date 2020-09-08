
export function getCookieValueServer(cookie, cookieName) {
    const array = getCookieArrayServer(cookie)
    const reducer = (
        accumulator,
        currentValue,
        currentIndex,
        array
    ) => {
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
    return value

}
