// get a cookie array
export function getCookieArray() {
    const array = document.cookie.split(';').map((item) => {
        let newItem = item.trim()
        let newItemArray = newItem.split('=')
        return newItemArray
    })
    return array
}