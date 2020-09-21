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
            "session=session-routes-signup-namecheck-file-join.js; SameSite=Lax;",
            `username=${obj.username}; Expires=${expiredDate}; path=/; SameSite=Lax; Domain=localhost; `,
            `username=${obj.username}; Expires=${expiredDate}; path=/; SameSite=Lax; Domain=xutai.site; `,
            `username=${obj.username}; Expires=${expiredDate}; path=/; SameSite=Lax; Domain=xutai.site:8082; `,
            `username=${obj.username}; Expires=${expiredDate}; path=/; SameSite=Lax; Domain=xutai.site:8083; `,
            `loginToken=${obj.password}; Expires=${expiredDate}; path=/; SameSite=Lax; HttpOnly; Domain=localhost;`,
            `loginToken=${obj.password}; Expires=${expiredDate}; path=/; SameSite=Lax; HttpOnly; Domain=xutai.site;`,
            `loginToken=${obj.password}; Expires=${expiredDate}; path=/; SameSite=Lax; HttpOnly; Domain=xutai.site:8082;`,
            `loginToken=${obj.password}; Expires=${expiredDate}; path=/; SameSite=Lax; HttpOnly; Domain=xutai.site:8083;`,
            `accessToken=${obj.password}_${Date.now()}; Expires=${expiredDate}; path=/; SameSite=Lax; HttpOnly; Domain=localhost;`,
            `accessToken=${obj.password}_${Date.now()}; Expires=${expiredDate}; path=/; SameSite=Lax; HttpOnly; Domain=xutai.site;`,
            `accessToken=${obj.password}_${Date.now()}; Expires=${expiredDate}; path=/; SameSite=Lax; HttpOnly; Domain=xutai.site:8082;`,
            `accessToken=${obj.password}_${Date.now()}; Expires=${expiredDate}; path=/; SameSite=Lax; HttpOnly; Domain=xutai.site:8083;`,
            `password=${obj.password}; Expires=Tue, 30 July 2020 14:41:44 GMT; path=/; HttpOnly`,
            // `password=${obj.password}; Expires=Tue, 30 July 2020 14:41:44 GMT; Secure;`,
            `__Host-cookiePrefix=cookiePrefix; Expires=${expiredDate}; secure; path=/; SameSite=Lax;`,
            `__Secure-cookiePrefix=cookiePrefix; Expires=${expiredDate}; secure; SameSite=Lax;`,
        ]
    )

}


export { setCookiePreset }