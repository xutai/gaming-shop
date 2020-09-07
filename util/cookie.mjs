

// signup page

// Example #1: Simple usage
// document.cookie = "name=oeschger";
// document.cookie = "favorite_food=tripe";
// function alertCookie() {
//     alert(document.cookie);
// }

// Example #2: Get a sample cookie named test2
// document.cookie = "test1=Hello";
// document.cookie = "test2=World";

// const cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('test2'))
//     .split('=')[1];

// function alertCookieValue() {
//     alert(cookieValue);
// }

// Example #3: Do something only once
// function doOnce() {
//     if (!document.cookie.split('; ').find(row => row.startsWith('doSomethingOnlyOnce'))) {
//         alert("Do something here!");
//         document.cookie = "doSomethingOnlyOnce=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
//     }
// }

//Example #4: Reset the previous cookie
// function resetOnce() {
//     document.cookie = "doSomethingOnlyOnce=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
// }

function resetCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

//Example #5: Check a cookie existence
function checkCookieExistence(cookieName) {

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




//Example #6: Check that a cookie has a specific value
//ES5

// if (document.cookie.split(';').some(function (item) {
//     return item.indexOf('reader=1') >= 0
// })) {
//     console.log('The cookie "reader" has "1" for value')
// }

// //ES2016

// if (document.cookie.split(';').some((item) => item.includes('reader=1'))) {
//     console.log('The cookie "reader" has "1" for value')
// }

// get a cookie array
function getCookieArray() {
    const array = document.cookie.split(';').map((item) => {
        let newItem = item.trim()
        let newItemArray = newItem.split('=')
        return newItemArray
    })
    return array
}

function getCookieArrayServer(cookie) {
    const array = cookie.split(';').map((item) => {
        let newItem = item.trim()
        let newItemArray = newItem.split('=')
        return newItemArray
    })
    return array
}


function getCookieValueServer(cookie, cookieName) {
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

//Get a cookie value
function getCookieValue(cookieName) {
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


// update cookie
function updateCookie(cookieName, cookieValue) {
    console.info(
        "cookie.mjs - updateCookie",
        cookieName, cookieValue
    )
    document.cookie = `${cookieName}=${cookieValue}`
}

const cookieObj = {
    checkCookieExistence,
    getCookieArray,
    getCookieValue,
    resetCookie,
    updateCookie,
    getCookieValueServer
}

// document.cookie = "cookieName=cookieValue"
// console.log(document)
// console.log("document.cookie", document.cookie)





function whatIsThis() {
    // login page


    var allCookies = document.cookie
    var m = '123'
    var n = m
    // console.log("allCookies:", allCookies)
    // console.log(`m: ${m}, n: ${n}`)
    m += '456'
    // console.log(`m: ${m}, n: ${n}`)
    // Assigning two variables with single string value
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#Description
    // 感觉还是要从头开始学一下js


    // check a cookie
    // 把每一项拿出来，通过;来分离成一个数组，然后对每一项进行测试，如果满足条件即
    // 删除过whitespace之类的内容后，字符串最前面的是'a='，那么通过测试，返回true，
    // 然后保留这个元素。 最后对最后的数组进行长度判断，如果里面有元素的话
    if (document.cookie.split(';').filter(function (item) {
        return item.trim().indexOf('a=') == 0
    }).length) {
        console.log(`在cookie中key为a是存在的！`)
        // 尝试哪一个cookie命名为a
        var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)a\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        console.log(`在cookie中key为a的值value为: ${cookieValue}`)
    }
}

function setACookie(testType) {
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

function updateACookie(testType) {
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

function getCookie(cookieName) {
    const allCookies = document.cookie
}





export { cookieObj, getCookie, updateACookie, setACookie, getCookieValue }