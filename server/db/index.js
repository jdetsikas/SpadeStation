const client = require('./client')

module.exports = {
    client,
    ...require('./users'),
    ...require('./games'),
    ...require('./orders'),
    ...require('./order_games')
}
