const events = require('events')

const fs = require('fs');

const eventEmitter = new events.EventEmitter();

const eventOpenFileHandler = () => {
    console.log('Event!')
    eventEmitter.emit('event_open_file')
};

eventEmitter.on('event_open_file', () => {
    console.log('Opened file successfully.')
});

const eventCreateFileHandler = () => {
    console.log('Event!')
    eventEmitter.emit('event_create_file')
};

eventEmitter.on('event_create_file', () => {
    console.log('Created file successfully.')
});

const text = "strings";

fs.mkdir('test_folder', () => {
    fs.writeFile('test_folder/test_file.txt', text, (err) => {
        if (err) {
            console.error(err);
            throw err
        }
        eventCreateFileHandler();
        fs.readFile('test_folder/test_file.txt', (err, data) => {
            if (err) {
                console.error(err);
                throw err
            }
            eventOpenFileHandler();
            console.log(data.toString('utf8'));
        })
    })
});