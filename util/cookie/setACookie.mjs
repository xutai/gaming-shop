export function setACookie(testType) {
    console.info(
        "cookie.mjs - setACookie",
        testType
    )
    switch (testType) {
        case 1:
            /*
            case 1: simple test
            case 2: special characters in value
            */
            // 这里有个难点，就是reference, primitive, closure，scope
            // 可以看出这个赋值的一点问题，看上面的链接
            document.cookie = 'a=123'
            document.cookie = 'b=456'
            m += '789'
            console.log(`m: ${m}, n: ${n}`)
            var timeoutID = window.setTimeout(function () {
                console.log(`m: ${m}, n: ${n}`)
                console.log("allCookies:", allCookies)
                try {
                    console.log("document.cookie:", document.cookie)
                } catch (e) {
                    console.log(
                        e instanceof ReferenceError, "e instanceof ReferenceError",
                        e.message, "e.message",
                        e.name, "e.name",
                        e.fileName, "e.fileName",
                        e.lineNumber, "e.lineNumber",
                        e.columnNumber, "e.columnNumber",
                        e.stack, "e.stack",
                    );
                }
                window.clearTimeout(timeoutID)
            }, 1000)
            console.log("timeoutID:", timeoutID)
            console.log(`m: ${m}, n: ${n}`)
            break
        case 2:
            document.cookie = 'a= whitespace'
            document.cookie = encodeURIComponent('b= whitespace')
            // 看到=变成了%3D，whitespace变成了%20
            document.cookie = "c=" + encodeURIComponent(' whitespace')
            console.log("document.cookie:", document.cookie)
            break
    }
}
