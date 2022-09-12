const Koa = require('koa')
const Router = require('koa-router')
const jsonBody = require('koa-json-body')

const model = require('./data/model')

const app = new Koa()
    .use(jsonBody())

const router = new Router()

router
    .post('/users', async (ctx) => {
        const data = ctx.request.body
        const id = await model.insert(data.name)

        ctx.status = 200
        ctx.body = id
    })

    .get('/users', async (ctx) => {
        const data = await model.retrieveAll()

        ctx.status = 200
        ctx.body = data
    })

    .get('/users/:id', async (ctx) => {
        const data = await model.retrieve(ctx.params.id)

        ctx.status = 200
        ctx.body = data[0]
    })

    .put('/users/:id', async (ctx) => {
        const data = ctx.request.body
        const new_data = await model.update(ctx.params.id, data.name)

        ctx.status = 204
    })

    .delete('/users/:id', async (ctx) => {
        await model.deleteUser(ctx.params.id)

        ctx.status = 204
    })

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(8080, console.log(`Live on 8080`))