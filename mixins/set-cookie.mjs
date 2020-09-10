const expiredDate = 'Wednesday, 30 Sep 2020 13:22:00'
const setCookiePreset = (obj) => {
    if (obj instanceof URLSearchParams) {
        let newObj = new Object()
        for (const [key, value] of obj.entries()) {
            Reflect.defineProperty(
                newObj,
                key,
                {
                    value
                }
            )
        }
        obj = newObj
    }
    return (
        [
            "session=session-routes-signup-namecheck-file-join.js; SameSite=Lax",
            `username=${obj.username}; Expires=${expiredDate}; Domain=xutai.site;  path=/; SameSite=Lax`,
            `username=${obj.username}; Expires=${expiredDate}; Domain=localhost;  path=/; SameSite=Lax`,
            `loginToken=${obj.password}; Expires=${expiredDate}; Domain="xutai.site"; path=/; SameSite=Lax; HttpOnly`,
            `loginToken=${obj.password}; Expires=${expiredDate}; Domain=localhost; path=/; SameSite=Lax; HttpOnly`,
            `accessToken=${obj.password}_${Date.now()}; Expires=${expiredDate}; Domain=xutai.site;path=/; SameSite=Lax; HttpOnly`,
            `accessToken=${obj.password}_${Date.now()}; Expires=${expiredDate}; Domain=localhost;path=/; SameSite=Lax; HttpOnly`,
            // `password=${obj.password}; Expires=Tue, 30 July 2020 14:41:44 GMT; path=/; HttpOnly`,
            // `password=${obj.password}; Expires=Tue, 30 July 2020 14:41:44 GMT; Secure;`,
            `__Host-cookiePrefix=cookiePrefix; Expires=${expiredDate}; secure; path=/; SameSite=Lax`,
            `__Secure-cookiePrefix=cookiePrefix; Expires=${expiredDate}; secure; SameSite=Lax`,
        ]
    )

}


export { setCookiePreset }