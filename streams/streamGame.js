const fs = require('fs')

// let data = 'Thomas is super cool. Totally.'

// const writerStream = fs.createWriteStream('output.txt')

// writerStream.write(data, 'utf8')

// writerStream.end()


// writerStream.on('finish', () => {
//     console.log(`Writing complete.`)
// })

// writerStream.on('error', (err) => {
//     console.error(err.stack)
// })

// console.log(`Program ended.`)






// let data = ''

// const readerStream = fs.createReadStream('output.txt')

// readerStream.setEncoding('utf8')

// readerStream.on('data', (chunk) => {
//     data += chunk
// })

// readerStream.on('end', () => {
//     console.log(data)
// })

// readerStream.on('error', (err) => {
//     console.error(err.stack)
// })

// console.log(`Program ended.`)






const readerStream = fs.createReadStream('output.txt')

const writerStream = fs.createWriteStream('piped.txt')

readerStream.pipe(writerStream)

console.log(`Program ended.`)