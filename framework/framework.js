const koa = require('koa')

const app = new koa()

app.use(async (ctx) => {
    console.log('Hello World')
})

app.listen(8080)