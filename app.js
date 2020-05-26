const express = require('express')
const Agendash = require('agendash')

const agenda = require('./lib/agenda')

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
    }, 1000 * getRandomInt(10))
}

app.get('/', (req, res) => {
    if (isEndpointWorking) {
        res.status(200).send({ status: 'SUCCESS' })
    } else {
        res.status(500).send({ status: 'ERROR' })
    }
})

app.use('/admin', Agendash(agenda))

app.listen(PORT, () => {
    console.log(`App started at port ${PORT}`)
    mockEndpointState()
})

function graceful() {
    agenda.stop(function () {
        process.exit(0)
    })
}

process.on('SIGTERM', graceful)
process.on('SIGINT', graceful)
