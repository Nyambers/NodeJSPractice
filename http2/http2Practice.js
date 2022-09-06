
const fs = require('fs')
const koa = require('koa')
const http2 = require('http2')

// set up variables
const app = new koa()
const HTTP_PORT = 8000
const HTTP2_PORT = 8001
const key = fs.readFileSync('key.pem')
const cert = fs.readFileSync('cert.pem')

const options = {
    key: key,
    cert: cert
}

app.use(ctx => {
    ctx.body = 'test my http2?'
})

// Set default server
app.listen(HTTP_PORT, () => {
    console.log(`Ready unsecured: ${HTTP_PORT}`)
})

// Set http2 server
http2.createSecureServer(options, app.callback())
.listen(HTTP2_PORT, () => {
    console.log(`Ready secured: ${HTTP2_PORT}`)
})