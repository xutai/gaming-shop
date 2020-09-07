const checkCrendentials = require('../modules/checkCredentials')
module.exports = (req) => {
    return new Promise((resolve, rejct) => {
        ; (async () => {
            const status = await checkCrendentials(req, 'accessToken')
            switch (status) {
                case 'hasPermission':
                    resolve(true)
                case 'noPermission':
                    resolve(false)
                default:
            }
        })()
    })
}


