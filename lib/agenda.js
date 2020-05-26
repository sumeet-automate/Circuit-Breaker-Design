const request = require('request')
const Agenda = require('agenda')

const agenda = new Agenda({
    db: {
        address: 'mongodb://localhost:27017/circuit-breaker',
        collection: 'jobs'
    },
    processEvery: 500,
    name: 'Test Agenda'
})

agenda.on('ready', () => {
    console.log('Agenda is ready, starting it')

    const jobTypes = require('./jobs')(agenda) || []
    jobTypes.forEach(job => {
        const agendaJob = agenda.create(job, {}).repeatEvery(1000)
        agendaJob.save()
    })

    agenda.start()
})

agenda.on('start', function (job) {
    // console.log('Job %s started', job.attrs.name)
})

agenda.on('complete', function (job) {
    // console.log('Job %s finished', job.attrs.name)
})

agenda.on('error', err => {
    console.log('Agenda error', err)
})

module.exports = agenda
