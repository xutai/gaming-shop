const concatenateGamelist = require('../business/concatenateGamelist')
const connect = require('../db/connect.js')

module.exports = () => {
    return new Promise((resolve, reject) => {
        // console.info(__filename)
        const getConcatenatedString = async (docs) => {
            let display = ''
            display += await concatenateGamelist(display, docs)
            // console.info("display",display)
            resolve(display)
        }
            ; (async () => {
                try {
                    const query = new URLSearchParams()
                    // console.info("query", query)
                    const docs = await connect('pcgames', 'findAll', query)
                    // console.info("docs", docs)
                    getConcatenatedString(docs)
                } catch (e) {
                    console.error(e)
                }
            })()
    })
}

