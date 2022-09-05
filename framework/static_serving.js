const koa = require('koa')

const serve = require('koa-static-server')

const app = new koa()

const hostname = 'localhost'

const port = 3000

app.use(serve({rootDir:'public'}))

app.listen(port, hostname, () => {
    console.log(`Server at http://${hostname}:${port}`)
})