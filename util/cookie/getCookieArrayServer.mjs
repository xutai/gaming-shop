export function getCookieArrayServer(cookie) {
    const array = cookie.split(';').map((item) => {
        let newItem = item.trim()
        let newItemArray = newItem.split('=')
        return newItemArray
    })
    return array
}
