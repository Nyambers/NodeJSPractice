const koa = require('koa')
const app = new koa()

app.use(async (ctx, next) => {
    console.log('>> one')
    await next()
    console.log('>> ???')
})
app.use(async (ctx, next) => {
    console.log('>> two')
    ctx.body = 'two'
})
app.use(async (ctx, next) => {
    console.log('>> three')
    await next()
})

app.listen(8080)