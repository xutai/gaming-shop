const checkCrendentials = require('../modules/checkCredentials')

module.exports = (req) => {
    return new Promise((resolve, rejct) => {
        ; (async () => {
            const status = await checkCrendentials(req, 'loginToken')
            switch (status) {
                case 'invalid':
                    resolve(false)
                case 'valid':
                    resolve(true)
                default:
                    
            }
        })()
    })
}