// update cookie
export function updateCookie(cookieName, cookieValue) {
    console.info(
        "cookie.mjs - updateCookie",
        cookieName, cookieValue
    )
    document.cookie = `${cookieName}=${cookieValue}`
}