//Example #4: Reset the previous cookie
// function resetOnce() {
//     document.cookie = "doSomethingOnlyOnce=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
// }
const domain = {
    local: 'localhost',
    remote: 'xutai.site'
}
const path = '/'

export function resetCookie(cookieName) {
    console.log(
        "resetCookie.mjs",
        "cookieName", cookieName,
        // "document.cookie",document.cookie
    )
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain.local}`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain.local}`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;  domain=${domain.remote}`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain.remote}`;
    // console.log(
    //     "document.cookie",document.cookie
    // )

    // document.cookie ="username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
