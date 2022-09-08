// imports
const koa = require('koa')
const Router = require('koa-router')

// consts
const app = new koa()
const router = new Router()

// 10000 - 99999 only
router.get('/company/:id([1-9][0-9]{4})', (ctx) => {
    const id = ctx.params.id
    const data = `Welcome to ${id}`
    ctx.status = 200
    ctx.body = data
})

// 00000 - 99999 allowed
// router.get('/company/:id([0-9]{5})', (ctx) => {
//     const id = ctx.params.id
//     const data = `Welcome to ${id}`
//     ctx.status = 200
//     ctx.body = data
// })

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

app.listen(8080)

console.log('Server started at port 8080')