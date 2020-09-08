export function updateACookie(testType) {
    console.info(
        "cookie.mjs - updateACookie",
        testType
    )
    switch (testType) {
        case 1:
            document.cookie = 'a=789'
            var timeoutID = window.setTimeout(function () {
                console.log("allCookies:", allCookies)
                console.log("document.cookie:", document.cookie)
                window.clearTimeout(timeoutID)
            }, 1000)
            console.log("timeoutID:", timeoutID)
            break
        case 2:
            break
    }
}
