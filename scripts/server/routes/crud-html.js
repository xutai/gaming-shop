const path = require('path')
const fs = require('fs')
module.exports = (url) => {
    if (
        url.pathname.includes('/pages/gaming/pcgames/') &&
        url.pathname.includes(".html")
    ) {
        const pcgameFileName = url.pathname.slice(9, -5)
        fs.readFile(
            path.resolve(
                __dirname,
                `pcgames/${pcgameFileName}.html`
            ),
            (err, data) => {
                if (err) throw err
                res.end(data)
            })
    }

    else if (url.pathname === '/pages/gaming/to_save_games') {
        fs.readFile(
            path.join(rootDir, 'pages/gaming/', 'save_games.html'),
            (err, data) => {
                if (err) throw err
                // console.trace(err)
                res.end(data)
            }
        )
    }
    else if (url.pathname === '/pages/gaming/to_find_games') {
        fs.readFile(
            // v1 using path.join()
            path.join(rootDir, 'pages/gaming/', 'find_games.html'),
            // v2 using path.resolve()
            // path.resolve('../../../', 'pages/gaming/to_save_games.html'),
            (err, data) => {
                if (err) throw err
                res.end(data)
            })
    }
}