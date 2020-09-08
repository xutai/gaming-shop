const cookiePromise = import('../util/cookie.mjs')
const dbQueryCredentials = require('./dbQueryCredentials')
module.exports = async (req, type) => {
    const cookie = req.headers.cookie
    try {
        const {
            cookieObj: {
                getCookieValueServer
            }
        } = await cookiePromise

        // console.log(
        //     "cookie", cookie,
        //     "getCookieValueServer(cookie, 'username')", getCookieValueServer(cookie, 'username'),
        //     "getCookieValueServer(cookie, 'loginToken')", getCookieValueServer(cookie, 'loginToken')
        // )


        if (type === 'accessToken') {
            if (!cookie) return new Promise(resolve => resolve('noPermission'))
            const acesssToken = getCookieValueServer(cookie, 'accessToken')
            if (acesssToken) {
                return new Promise(resolve => resolve('hasPermission'))
            } else {
                return new Promise(resolve => resolve('noPermission'))
            }
        } else if (type === 'loginToken') {

            const username = getCookieValueServer(cookie, 'username')
            const loginToken = getCookieValueServer(cookie, 'loginToken')

            const { record } = await dbQueryCredentials(username)

            console.info(
                "cookie",
                {
                    username,
                    loginToken
                },
                "record",
                record
            )

            if (
                record && username === record.username &&
                loginToken && loginToken === record.loginToken
            ) {
                return new Promise(resolve => resolve('valid'))
            } else {
                return new Promise(resolve => resolve('invalid'))
            }

        }

    } catch (error) {
        console.error(error)
    } finally {

    }

}