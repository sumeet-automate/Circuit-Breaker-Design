const request = require('request')

function callback(job, done) {
    request('http://localhost:3000/', (err, response, body) => {
        if (err || response.statusCode !== 200) {
            console.log('BAD Response')
        } else {
            console.log('GOOD Response')
        }

        done()
    })
}

module.exports = function (agenda) {
    setTimeout(() => {
        agenda.define('POLL', callback)
    }, 1000)
}
