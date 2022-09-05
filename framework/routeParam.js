// imports
const koa = require('koa')
const Router = require('koa-router')

// consts
const app = new koa()
const router = new Router()

// GET routes
router.get('/company/:company', (ctx) => {
    const company = ctx.params.company
    const data = `Welcome to ${company}`
    ctx.status = 200
    ctx.body = data
})

router.get('/company', (ctx) => {
    // localhost:8080/company?companyName=...

    const companyName = ctx.query.companyName
    const data = `Welcome to ${companyName}`
    ctx.status = 200
    ctx.body = data
})



app.use(router.routes())

app.listen(8080)

console.log('Server started at port 8080')