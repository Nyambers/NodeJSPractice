const koa = require('koa')

const Router = require('koa-router')

const app = new koa()

const router = new Router()


router.all('/login', (ctx, next) => {
    console.log('Rerouting...')
    ctx.redirect('/login_new')
    ctx.status = 301
})

app.use(router.routes())

app.listen(8080)

console.log('Server started at port 8080')