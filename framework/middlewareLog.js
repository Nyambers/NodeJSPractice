const koa = require('koa')

const app = new koa()

app.use(async (ctx, next) => {
    const start = Date.now()

    await next()

    const ms = Date.now() - start

    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async ctx => {
    console.log(ctx.request)
    console.log(ctx.response)

    ctx.body = `Hello World`
})

app.listen(8080)