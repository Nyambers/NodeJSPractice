const events = require('events')

const fs = require('fs');

const eventEmitter = new events.EventEmitter()

const eventHandler = () => {
    console.log('Event!')
    eventEmitter.emit('event_open_file')
}

eventEmitter.on('event_open_file', () => {
    console.log('Opened file successfully.')
})

fs.readFile('./foo.txt', (err, data) => {
    if (err) {
        console.error(err.message);
        throw err;
    }

    eventHandler();
    console.log(data.toString('utf8'));
})