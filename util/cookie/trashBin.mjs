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



export function whatIsThis() {
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

// document.cookie = "cookieName=cookieValue"
// console.log(document)
// console.log("document.cookie", document.cookie)