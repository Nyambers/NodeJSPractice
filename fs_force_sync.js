const fs = require('fs');

const text = "test text";

fs.mkdir('test_folder', () => {
    fs.writeFile('test_folder/test_file.txt', text, (err) => {
        if (err) {
            console.error(err);
            throw err
        }
        fs.readFile('test_folder/test_file.txt', (err, data) => {
            if (err) {
                console.error(err);
                throw err
            }
            console.log(data.toString('utf8'));
        })
    })
});