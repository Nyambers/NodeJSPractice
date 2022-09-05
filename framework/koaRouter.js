const koa = require('koa')

const Router = require('koa-router')

const app = new koa()

const router = new Router()

// GET method route
router.get('/hello', (ctx) => {
    const data = 'Hello World'

    ctx.status = 200

    ctx.body = data
})

router.all('/*', function(ctx, next) {
    console.log('Accessing something special...')
    next()
})

app.use(router.routes())

app.listen(8080)

console.log('Server started at port 8080')