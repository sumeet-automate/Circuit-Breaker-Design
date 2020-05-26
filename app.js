const express = require('express')

const requestService = require('./requestService')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/healthy-endpoint', (req, res) => {
    const shouldWork = Math.random() > 0.3

    if (shouldWork) {
        res.status(200).send({ status: 'SUCCESS' })
    } else {
        res.status(500).send({ status: 'ERROR' })
    }
})

app.get('/unhealthy-endpoint', (req, res) => {
    const shouldWork = Math.random() > 0.7

    if (shouldWork) {
        res.status(200).send({ status: 'SUCCESS' })
    } else {
        res.status(500).send({ status: 'ERROR' })
    }
})

app.get('/critical-endpoint', (req, res) => {
    const shouldWork = Math.random() > 0.9

    if (shouldWork) {
        res.status(200).send({ status: 'SUCCESS' })
    } else {
        res.status(500).send({ status: 'ERROR' })
    }
})

app.listen(PORT, () => {
    console.log(`App started at port ${PORT}`)

    requestService.doRequest({
        count: 5,
        interval: 1,
        after: 1
    })
})