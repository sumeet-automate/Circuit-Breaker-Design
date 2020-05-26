const request = require('request')

const requestState = []

function doRequest(options = {}) {
    const defaultRequestOptions = {
        count: 1,
        uri: 'http://localhost:3000/unhealthy-endpoint',
        after: 0, // seconds after which the request should fire
        interval: 0 // interval in seconds in which the request should fire one after another
    }

    const newRequestOptions = Object.assign({}, defaultRequestOptions, options)

    setTimeout(() => {
        for (let i = 1; i <= newRequestOptions.count; i++) {
            ;(function () {
                const index = i
                const startTime = new Date().getTime()

                setTimeout(() => {
                    request(newRequestOptions.uri, {}, (err, response, body) => {
                        const interval = (new Date().getTime() - startTime) / 1000

                        if (err || response.statusCode !== 200) {
                            requestState.push({ success: false, failure: true, statusCode: response.statusCode, interval })
                        } else {
                            requestState.push({ success: true, failure: false, statusCode: response.statusCode, interval })
                        }

                        if (index === newRequestOptions.count) {
                            console.log(JSON.stringify(requestState, ' ', 4))
                        }
                    })
                }, newRequestOptions.interval * 1000 * index)
            })()
        }
    }, newRequestOptions.after * 1000)
}

module.exports = { doRequest }
