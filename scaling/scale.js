const cluster = require('cluster')
const http = require('http')
const os = require('os')
const numCPUs = os.cpus().length

// console.log(numCPUs)

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
} else {
    console.log(`PID: ${process.pid}`)
    http.createServer((req, res) => {
        
        res.writeHead(200);
        res.end(`Node ${process.pid} is ready!`)
    }).listen(8000)
}

// for (let i = 0; i < numCPUs; i++) {
//     cluster.fork()
// }

// if one of the worker died, create new one immediately
cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
    console.log('Starting a new worker')
    cluster.fork()
})

cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online')
})