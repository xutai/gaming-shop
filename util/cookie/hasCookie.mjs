//Example #5: Check a cookie existence
export function hasCookie(cookieName) {

    //ES5
    // if (document.cookie.split(';').some(function (item) {
    //     return item.trim().indexOf('reader=') == 0
    // })) {
    //     console.log('The cookie "reader" exists (ES5)')
    // }

    // //ES2016
    // if (document.cookie.split(';').some((item) => item.trim().startsWith('reader='))) {
    //     console.log('The cookie "reader" exists (ES6)')
    // }

    if (document.cookie.split(';').some((item) => item.trim().startsWith(`${cookieName}=`))) {
        return true
    }

}