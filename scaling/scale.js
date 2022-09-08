// imports
const cluster = require('cluster')
const os = require('os')
const koa = require('koa')
const Router = require('koa-router')

// consts
const app = new koa()
const router = new Router()
const numCPUs = os.cpus().length
let counter = 0

// console.log(numCPUs)

// endpoints
router.get('/counter', (ctx) => {
    const data = counter++
    ctx.status = 200
    ctx.body = data
})

router.get('/heavy', (ctx) => {
    let total = 0
    for (let i = 0; i < 10000000000; i++) {
        total++    
    }
    ctx.status = 200
    ctx.body = total
})

app
.use(function (ctx,next){
    this.body = `Invalid URL!!! ${ctx.request.method} ${ctx.request.url}`
    ctx.response.type = 'text/html'
    ctx.response.body = this.body
    ctx.status = 404
    next()
})
.use(router.routes())
.use(router.allowedMethods())

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
} else {
    app.listen(8080)
    console.log(`Server started at port 8080 with PID ${process.pid}`)
}



// if one of the worker died, create new one immediately
cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
    console.log('Starting a new worker')
    cluster.fork()
})

cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is online')
})