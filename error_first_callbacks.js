const fs = require('fs');

fs.readFile('./foo.txt', (err, data) => {
    if (err) {
        console.error(err.message);
        throw err;
    }

    console.log(data.toString('utf8'));
})