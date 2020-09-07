module.exports = (req, res) => {
    const gamelist = require('../gaming/gamelist.js')
    gamelist(req, res)

    const finding_games = require('../gaming/finding_games')
    finding_games(req, res)

    const saving_games = require('../gaming/saving_games')
    saving_games(req, res)

    const editing_games = require('../gaming/editing_games')
    editing_games(req, res)

    const editing_games_submitted = require('../gaming/editing_games_submitted')
    editing_games_submitted(req, res)
}