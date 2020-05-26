const express = require('express')

const requestService = require('./requestService')

const app = express()
const PORT = process.env.PORT || 3000

let isEndpointWorking = true

const mockEndpointState = () => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max))
    }

    setInterval(() => {
        isEndpointWorking = !isEndpointWorking
        console.log('\nEndpoint state changed to ', isEndpointWorking ? 'Working' : 'Non Working')
    }, 1000 * getRandomInt(5))
}

app.get('/', (req, res) => {
    if (isEndpointWorking) {
        res.status(200).send({ status: 'SUCCESS' })
    } else {
        res.status(500).send({ status: 'ERROR' })
    }
})

app.listen(PORT, () => {
    console.log(`App started at port ${PORT}`)
    mockEndpointState()

    requestService.doRequest({
        count: 5,
        interval: 1,
        after: 1
    })
})
