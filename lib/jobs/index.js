const pollJob = require('./poll')

module.exports = function (agenda) {
    pollJob(agenda)

    return ['POLL']
}
